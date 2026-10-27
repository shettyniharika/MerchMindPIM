/**
 * MerchMind PIM — Core Application Logic
 * Orchestrates multimodal visual tagging, brand-voice copywriting,
 * schema validation, batch vendor ingestion, and multi-channel syndication.
 */

(() => {
  'use strict';

  // Application State
  const state = {
    catalog: JSON.parse(JSON.stringify(INITIAL_CATALOG)),
    activeSkuId: (INITIAL_CATALOG[0] && INITIAL_CATALOG[0].id) || 'SKU-BR1-8821',
    activeBrandFilter: 'all',
    activeVoice: 'brand1',
    activeView: 'studio',
    isAgentRunning: false,
    exportMode: 'json',
    pendingIngestItems: null,
    catalogStatusFilter: 'all',
    catalogSortMode: 'default'
  };

  // DOM Elements
  const brandFilterBar = document.getElementById('brandFilterBar');
  const tabStudioBtn = document.getElementById('tabStudioBtn');
  const tabCatalogBtn = document.getElementById('tabCatalogBtn');
  const studioView = document.getElementById('studioView');
  const catalogView = document.getElementById('catalogView');

  // KPI Elements
  const kpiCatalogHealth = document.getElementById('kpiCatalogHealth');
  const kpiTotalSkus = document.getElementById('kpiTotalSkus');
  const kpiConfidence = document.getElementById('kpiConfidence');
  const kpiReadyRate = document.getElementById('kpiReadyRate');

  // Studio Elements
  const activeSkuName = document.getElementById('activeSkuName');
  const activeSkuCode = document.getElementById('activeSkuCode');
  const activeBrandBadge = document.getElementById('activeBrandBadge');
  const mainProductImg = document.getElementById('mainProductImg');
  const visionPinsContainer = document.getElementById('visionPinsContainer');
  const vendorRawText = document.getElementById('vendorRawText');
  const vendorDate = document.getElementById('vendorDate');
  const runAgentBtn = document.getElementById('runAgentBtn');
  const agentTraceBox = document.getElementById('agentTraceBox');
  const skuCompletenessScore = document.getElementById('skuCompletenessScore');
  const attributesTable = document.getElementById('attributesTable');

  // Brand Voice Elements
  const brandVoiceSelector = document.getElementById('brandVoiceSelector');
  const copyTitle = document.getElementById('copyTitle');
  const copyHeadline = document.getElementById('copyHeadline');
  const copyRomance = document.getElementById('copyRomance');
  const copyBulletsList = document.getElementById('copyBulletsList');
  const complianceRow = document.getElementById('complianceRow');

  // Catalog Table Elements
  const catalogTableBody = document.getElementById('catalogTableBody');
  const catalogItemCount = document.getElementById('catalogItemCount');
  const filterStatusSelect = document.getElementById('filterStatusSelect');
  const sortCompletenessSelect = document.getElementById('sortCompletenessSelect');
  const bulkEnrichBtn = document.getElementById('bulkEnrichBtn');

  // Modal Elements
  const exportModal = document.getElementById('exportModal');
  const openExportBtn = document.getElementById('openExportBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const tabExportJSON = document.getElementById('tabExportJSON');
  const tabExportCSV = document.getElementById('tabExportCSV');
  const exportCodeViewer = document.getElementById('exportCodeViewer');
  const copyFeedBtn = document.getElementById('copyFeedBtn');
  const downloadFeedBtn = document.getElementById('downloadFeedBtn');

  // Ingest Modal Elements
  const ingestModal = document.getElementById('ingestModal');
  const openIngestModalBtn = document.getElementById('openIngestModalBtn');
  const closeIngestModalBtn = document.getElementById('closeIngestModalBtn');
  const cancelIngestBtn = document.getElementById('cancelIngestBtn');
  const loadPrepackagedFeedBtn = document.getElementById('loadPrepackagedFeedBtn');
  const triggerFileInputBtn = document.getElementById('triggerFileInputBtn');
  const vendorFileInput = document.getElementById('vendorFileInput');
  const fileUploadStatus = document.getElementById('fileUploadStatus');
  const ingestPreviewSummary = document.getElementById('ingestPreviewSummary');
  const confirmIngestBtn = document.getElementById('confirmIngestBtn');

  const appToast = document.getElementById('appToast');
  const toastMsg = document.getElementById('toastMsg');

  // Helper: Get active SKU
  function getActiveSku() {
    return state.catalog.find(item => item.id === state.activeSkuId) || state.catalog[0];
  }

  // Toast Notification
  function showToast(message) {
    if (!appToast) return;
    toastMsg.textContent = message;
    appToast.classList.add('show');
    setTimeout(() => {
      appToast.classList.remove('show');
    }, 3500);
  }

  // Calculate & Refresh KPI Banner
  function refreshKPIs() {
    const total = state.catalog.length;
    let sumCompleteness = 0;
    let sumConfidence = 0;
    let readyCount = 0;

    state.catalog.forEach(item => {
      const score = PIMSchemaValidator.calculateCompleteness(item);
      item.completenessScore = score;
      sumCompleteness += score;
      sumConfidence += item.aiConfidence || 92;

      const compliance = PIMSchemaValidator.validateChannelCompliance(item);
      if (compliance.shopify.passed && compliance.wholesale.passed) {
        readyCount++;
      }
    });

    const avgHealth = Math.round(sumCompleteness / total);
    const avgConfidence = (sumConfidence / total).toFixed(1);
    const readyRate = Math.round((readyCount / total) * 100);

    kpiCatalogHealth.textContent = `${avgHealth}%`;
    kpiTotalSkus.textContent = `${total} Active`;
    kpiConfidence.textContent = `${avgConfidence}%`;
    kpiReadyRate.textContent = `${readyRate}%`;

    if (catalogItemCount) {
      catalogItemCount.textContent = `Displaying ${total} Managed SKUs across Brand One, Brand Two, and Brand Three`;
    }
  }

  // Render Visual Pin Tokens on the Product Image
  function renderVisionPins(sku) {
    visionPinsContainer.innerHTML = '';
    if (!sku.visualTokens || !sku.visualTokens.length) return;

    sku.visualTokens.forEach(token => {
      const pin = document.createElement('div');
      pin.className = 'vision-pin';
      pin.style.left = `${token.x}%`;
      pin.style.top = `${token.y}%`;

      pin.innerHTML = `
        <div class="vision-pin-inner"></div>
        <div class="vision-pin-tooltip">
          ${token.label} (${token.confidence}%)
        </div>
      `;

      pin.addEventListener('click', () => {
        showToast(`AI Vision Tag: ${token.label} (${token.confidence}% confidence)`);
      });

      visionPinsContainer.appendChild(pin);
    });
  }

  // Render Governance Attributes Table
  function renderAttributesTable(sku) {
    const tbody = attributesTable.querySelector('tbody');
    tbody.innerHTML = '';

    const attrs = sku.attributes || {};
    const schema = PIMSchemaValidator.CORE_SCHEMA;

    schema.forEach(field => {
      const data = attrs[field.key] || { value: '', confidence: 0.85, verified: false };
      const tr = document.createElement('tr');
      tr.className = 'attribute-row';

      const confidencePct = Math.round((data.confidence || 0.9) * 100);
      const isAmber = confidencePct < 92 || !data.value;

      tr.innerHTML = `
        <td>
          <span style="display: flex; align-items: center; gap: 6px;">
            ${field.required ? '<span style="color: var(--gold-primary); font-weight: bold;">*</span>' : ''}
            ${field.label}
          </span>
        </td>
        <td>
          <input type="text" class="attribute-input" data-key="${field.key}" value="${data.value || ''}" placeholder="Missing attribute...">
        </td>
        <td>
          <span class="confidence-pill ${isAmber ? 'amber' : ''}" title="Click to toggle Human Verification" style="cursor: pointer;">
            ${data.verified ? '✓ Verified' : `${confidencePct}% AI`}
          </span>
        </td>
      `;

      // Handle attribute edits
      const input = tr.querySelector('.attribute-input');
      input.addEventListener('input', (e) => {
        if (!sku.attributes[field.key]) {
          sku.attributes[field.key] = { value: '', confidence: 1.0, verified: true };
        }
        sku.attributes[field.key].value = e.target.value;
        sku.attributes[field.key].verified = true;
        updateCompletenessAndCompliance(sku);
      });

      // Handle verification toggle
      const badge = tr.querySelector('.confidence-pill');
      badge.addEventListener('click', () => {
        data.verified = !data.verified;
        showToast(`${field.label} marked as ${data.verified ? 'Human Verified' : 'AI Draft'}`);
        renderAttributesTable(sku);
        updateCompletenessAndCompliance(sku);
      });

      tbody.appendChild(tr);
    });
  }

  // Update Completeness & Channel Compliance
  function updateCompletenessAndCompliance(sku) {
    const score = PIMSchemaValidator.calculateCompleteness(sku);
    sku.completenessScore = score;
    skuCompletenessScore.textContent = `${score}%`;

    const compliance = PIMSchemaValidator.validateChannelCompliance(sku);
    renderCompliance(compliance);
    refreshKPIs();
  }

  // Render Multi-Channel Compliance Cards
  function renderCompliance(compliance) {
    complianceRow.innerHTML = '';

    const channels = [
      { key: 'shopify', data: compliance.shopify },
      { key: 'wholesale', data: compliance.wholesale },
      { key: 'marketplaces', data: compliance.marketplaces }
    ];

    channels.forEach(ch => {
      const card = document.createElement('div');
      card.className = 'channel-card';

      const isReady = ch.data.passed;
      const issuesHtml = ch.data.issues.length
        ? ch.data.issues.slice(0, 2).map(iss => `<li>⚠ ${iss}</li>`).join('')
        : '<li style="color: var(--status-emerald);">✓ All validation rules passed</li>';

      card.innerHTML = `
        <div>
          <div class="channel-card-top">
            <span class="channel-name">${ch.data.channel.name}</span>
            <span class="channel-score-badge ${isReady ? 'ready' : 'pending'}">
              ${ch.data.score}% ${isReady ? 'Ready' : 'Pending'}
            </span>
          </div>
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width: ${ch.data.score}%;"></div>
          </div>
        </div>
        <ul class="channel-issues-list">
          ${issuesHtml}
        </ul>
      `;

      complianceRow.appendChild(card);
    });
  }

  // Render Brand Voice Copywriter
  function renderBrandVoice(sku) {
    const brand = state.activeVoice;
    const copy = (sku.copyByBrand && sku.copyByBrand[brand]) ? sku.copyByBrand[brand] : {
      title: sku.name,
      headline: 'Modern luxury silhouette with refined craftsmanship.',
      romance: 'Crafted with premium materials and signature design codes.',
      bullets: ['Premium luxury construction', 'Multi-compartment interior', 'Signature branding details', 'Imported']
    };

    copyTitle.value = copy.title || sku.name;
    copyHeadline.textContent = copy.headline || 'Luxury fashion catalog specification.';
    copyRomance.value = copy.romance || (sku.supplierRawData ? sku.supplierRawData.notes : '');

    copyBulletsList.innerHTML = '';
    const bullets = copy.bullets || [
      `Crafted from ${sku.attributes?.primaryMaterial?.value || 'genuine leather'}`,
      `Finished with ${sku.attributes?.hardwareFinish?.value || 'custom hardware'}`,
      `Origin: ${sku.attributes?.countryOfOrigin?.value || 'Handcrafted'}`,
      `Dimensions: ${sku.attributes?.dimensions?.value || 'Standard specification'}`
    ];

    bullets.forEach(bullet => {
      const li = document.createElement('li');
      li.className = 'bullet-item';
      li.innerHTML = `
        <span class="bullet-dot"></span>
        <span>${bullet}</span>
      `;
      copyBulletsList.appendChild(li);
    });

    copyTitle.oninput = (e) => {
      if (!sku.copyByBrand) sku.copyByBrand = {};
      if (!sku.copyByBrand[brand]) sku.copyByBrand[brand] = {};
      sku.copyByBrand[brand].title = e.target.value;
      updateCompletenessAndCompliance(sku);
    };

    copyRomance.oninput = (e) => {
      if (!sku.copyByBrand) sku.copyByBrand = {};
      if (!sku.copyByBrand[brand]) sku.copyByBrand[brand] = {};
      sku.copyByBrand[brand].romance = e.target.value;
      updateCompletenessAndCompliance(sku);
    };
  }

  // Load an active SKU into the Studio
  function loadSkuIntoStudio(sku) {
    state.activeSkuId = sku.id;
    state.activeVoice = sku.brand || 'brand1';

    activeSkuName.textContent = sku.name;
    activeSkuCode.textContent = `SKU: ${sku.sku} | MSRP: $${sku.retailPriceUSD}`;

    const brandObj = BRANDS[sku.brand.toUpperCase()] || BRANDS.BRAND1 || { name: 'Brand One', color: '#d4af37' };
    activeBrandBadge.textContent = brandObj.name;
    activeBrandBadge.style.color = brandObj.color;

    mainProductImg.src = sku.image || 'assets/Brand1Item1.png';
    mainProductImg.onerror = () => {
      mainProductImg.src = 'assets/Brand1Item1.png';
    };
    vendorRawText.value = sku.supplierRawData ? sku.supplierRawData.notes : (sku.vendorNotes || '');
    vendorDate.textContent = sku.supplierRawData ? `Received: ${sku.supplierRawData.receivedDate}` : (sku.season || '');

    document.querySelectorAll('.voice-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.voice === state.activeVoice);
    });

    renderVisionPins(sku);
    renderAttributesTable(sku);
    renderBrandVoice(sku);
    updateCompletenessAndCompliance(sku);
  }

  // Populate Master Catalog Table with Filtering and Sorting
  function renderCatalogTable() {
    catalogTableBody.innerHTML = '';

    // 1. Filter by Brand
    let list = state.activeBrandFilter === 'all'
      ? [...state.catalog]
      : state.catalog.filter(item => item.brand === state.activeBrandFilter);

    // 2. Filter by Quality Status
    if (state.catalogStatusFilter === 'incomplete') {
      list = list.filter(item => item.completenessScore < 65);
    } else if (state.catalogStatusFilter === 'needs_review') {
      list = list.filter(item => item.completenessScore >= 65 && item.completenessScore <= 85);
    } else if (state.catalogStatusFilter === 'enriched') {
      list = list.filter(item => item.completenessScore > 85);
    }

    // 3. Sort by Completeness
    if (state.catalogSortMode === 'asc') {
      list.sort((a, b) => a.completenessScore - b.completenessScore);
    } else if (state.catalogSortMode === 'desc') {
      list.sort((a, b) => b.completenessScore - a.completenessScore);
    }

    list.forEach(item => {
      const tr = document.createElement('tr');
      const brandObj = BRANDS[item.brand.toUpperCase()] || BRANDS.BRAND1 || { name: 'Brand One', color: '#d4af37' };

      const scoreColor = item.completenessScore >= 85
        ? 'var(--status-emerald)'
        : (item.completenessScore >= 65 ? 'var(--status-amber)' : 'var(--status-rose)');

      const fallbackImg = item.brand === 'brand3' ? 'assets/Brand3Image13.png' : (item.brand === 'brand2' ? 'assets/Brand2Item7.png' : 'assets/Brand1Item1.png');

      tr.innerHTML = `
        <td>
          <div class="sku-cell">
            <img class="sku-thumb" src="${item.image || fallbackImg}" onerror="this.src='${fallbackImg}'" alt="${item.name}">
            <div>
              <div class="sku-title">${item.name}</div>
              <div class="sku-code">${item.sku}</div>
            </div>
          </div>
        </td>
        <td>
          <span style="font-weight: 600; color: ${brandObj.color};">${brandObj.name}</span>
        </td>
        <td>
          <div style="font-size: 0.8rem; font-weight: 500; color: var(--text-secondary);">${item.subCategory || 'Leather Goods'}</div>
          <div style="font-size: 0.72rem; color: var(--text-subtle);">${item.taxonomyPath || 'Fashion Catalog'}</div>
        </td>
        <td>
          <span style="font-weight: 700;">$${item.retailPriceUSD || 395}</span>
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="progress-bar-track" style="width: 80px; margin-bottom: 0;">
              <div class="progress-bar-fill" style="width: ${item.completenessScore}%; background: ${scoreColor};"></div>
            </div>
            <span style="font-size: 0.78rem; font-weight: 700; color: ${scoreColor};">${item.completenessScore}%</span>
          </div>
        </td>
        <td>
          <span class="confidence-pill ${item.completenessScore >= 85 ? '' : (item.completenessScore >= 65 ? 'amber' : 'rose')}">
            ${item.completenessScore >= 85 ? '✓ Ready' : (item.completenessScore >= 65 ? 'Needs Review' : '⚠ Incomplete')}
          </span>
        </td>
        <td style="text-align: right;">
          <button class="btn-ghost edit-sku-btn" data-id="${item.id}" style="padding: 6px 12px; font-size: 0.78rem;">
            Inspect in Studio
          </button>
        </td>
      `;

      tr.querySelector('.edit-sku-btn').addEventListener('click', () => {
        loadSkuIntoStudio(item);
        switchView('studio');
      });

      catalogTableBody.appendChild(tr);
    });
  }

  // View Switcher (Studio vs Catalog Grid)
  function switchView(viewName) {
    state.activeView = viewName;
    if (viewName === 'studio') {
      tabStudioBtn.classList.add('active');
      tabCatalogBtn.classList.remove('active');
      studioView.style.display = 'grid';
      catalogView.style.display = 'none';
    } else {
      tabStudioBtn.classList.remove('active');
      tabCatalogBtn.classList.add('active');
      studioView.style.display = 'none';
      catalogView.style.display = 'block';
      renderCatalogTable();
    }
  }

  // Single SKU AI Enrichment Agent
  function triggerAgenticEnrichment() {
    if (state.isAgentRunning) return;
    state.isAgentRunning = true;
    runAgentBtn.disabled = true;
    agentTraceBox.classList.add('active');

    const steps = [
      { text: '[1/5] Ingesting visual tensor & raw vendor text...', delay: 600 },
      { text: '[2/5] Segmenting fashion silhouettes & leather texture with Vision Model...', delay: 1200 },
      { text: '[3/5] Mapping extracted tokens to GS1 Fashion Taxonomy schema...', delay: 1800 },
      { text: `[4/5] Synthesizing ${BRANDS[state.activeVoice.toUpperCase()].name} Brand Voice with LLM Copilot...`, delay: 2400 },
      { text: '[5/5] Executing Data Quality check & channel readiness compliance...', delay: 3000 }
    ];

    agentTraceBox.innerHTML = '';

    steps.forEach((step, idx) => {
      setTimeout(() => {
        const stepEl = document.createElement('div');
        stepEl.className = 'trace-step running';
        stepEl.innerHTML = `<span class="spin-icon">⚙</span> <span>${step.text}</span>`;
        agentTraceBox.appendChild(stepEl);

        if (idx > 0) {
          const prev = agentTraceBox.children[idx - 1];
          if (prev) {
            prev.className = 'trace-step completed';
            prev.querySelector('.spin-icon').textContent = '✓';
            prev.querySelector('.spin-icon').classList.remove('spin-icon');
          }
        }

        if (idx === steps.length - 1) {
          setTimeout(() => {
            stepEl.className = 'trace-step completed';
            stepEl.querySelector('.spin-icon').textContent = '✓';
            stepEl.querySelector('.spin-icon').classList.remove('spin-icon');

            const sku = getActiveSku();
            sku.status = 'enriched';
            sku.aiConfidence = 99;

            // Fill in missing fields with sensible high-confidence defaults
            const defaults = {
              silhouette: 'Structured Handbag / Footwear Profile',
              primaryMaterial: 'Glovetanned Cowhide / Stretch Suede',
              hardwareFinish: 'Polished Brass Finish',
              closureType: 'Signature Fastener',
              colorName: sku.attributes?.colorName?.value || 'Classic Collection',
              colorHex: sku.attributes?.colorHex?.value || '#222222',
              dimensions: sku.attributes?.dimensions?.value || '11.0" L x 8.0" H x 4.5" W',
              countryOfOrigin: sku.attributes?.countryOfOrigin?.value || 'Vietnam / Spain',
              hsTariffCode: '4202.21.6000',
              careInstruction: 'Clean with specialist leather cleaner. Store in protective dust cover.'
            };

            Object.keys(defaults).forEach(key => {
              if (!sku.attributes[key] || !sku.attributes[key].value) {
                sku.attributes[key] = { value: defaults[key], confidence: 0.98, verified: true };
              } else {
                sku.attributes[key].verified = true;
                sku.attributes[key].confidence = 0.99;
              }
            });

            loadSkuIntoStudio(sku);
            state.isAgentRunning = false;
            runAgentBtn.disabled = false;
            showToast('AI Enrichment complete! Quality score boosted to 100%.');
          }, 600);
        }
      }, step.delay);
    });
  }

  // Bulk AI Enrichment for all draft items
  function triggerBulkEnrichment() {
    bulkEnrichBtn.disabled = true;
    bulkEnrichBtn.innerHTML = `
      <span class="spin-icon">⚙</span>
      Enriching Batch Catalog...
    `;

    showToast('🤖 Running autonomous agent across all un-enriched vendor SKUs...');

    setTimeout(() => {
      let enrichedCount = 0;
      state.catalog.forEach(item => {
        if (item.completenessScore < 85 || item.status !== 'enriched') {
          item.status = 'enriched';
          item.aiConfidence = 98;
          enrichedCount++;

          // Auto-enrich missing attributes
          const schemaKeys = PIMSchemaValidator.CORE_SCHEMA;
          schemaKeys.forEach(f => {
            if (!item.attributes[f.key] || !item.attributes[f.key].value) {
              item.attributes[f.key] = {
                value: f.key === 'dimensions' ? '10.5" L x 8.0" H x 4.0" W'
                  : (f.key === 'hsTariffCode' ? '4202.21.6000'
                    : (f.key === 'careInstruction' ? 'Clean with specialist leather cleaner.'
                      : 'Standard Spec')),
                confidence: 0.96,
                verified: true
              };
            } else {
              item.attributes[f.key].verified = true;
              item.attributes[f.key].confidence = 0.98;
            }
          });

          item.completenessScore = PIMSchemaValidator.calculateCompleteness(item);
        }
      });

      refreshKPIs();
      renderCatalogTable();

      bulkEnrichBtn.disabled = false;
      bulkEnrichBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        Bulk AI Enrich All Incomplete
      `;

      showToast(`✨ Successfully enriched ${enrichedCount} SKUs! Catalog Health is now at ${kpiCatalogHealth.textContent}.`);
    }, 1800);
  }

  // Parse Raw Vendor Ingestion Data (JSON or CSV)
  function parseRawVendorFeed(rawData, isJson = true) {
    let items = [];

    if (isJson) {
      const parsed = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
      items = parsed.map((raw, idx) => {
        // Map raw object into standardized SKU schema
        const brandKey = (raw.brand || 'brand1').toLowerCase();
        const brandObj = BRANDS[brandKey.toUpperCase()] || BRANDS.BRAND1;
        const skuId = `SKU-${raw.sku || 'RAW-' + (idx + 1)}`;

        // Convert raw attributes into format with confidence scores
        const formattedAttrs = {};
        if (raw.attributes) {
          Object.keys(raw.attributes).forEach(k => {
            const val = raw.attributes[k];
            if (typeof val === 'object' && val !== null && val.value !== undefined) {
              formattedAttrs[k] = val;
            } else {
              formattedAttrs[k] = {
                value: String(val || ''),
                confidence: val ? 0.92 : 0.0,
                verified: false
              };
            }
          });
        }

        // Image assignment based on brand
        let defaultImg = 'assets/Brand1Item1.png';
        if (brandKey === 'brand2') defaultImg = 'assets/Brand2Item7.png';
        if (brandKey === 'brand3') defaultImg = 'assets/Brand3Image13.png';
        let img = raw.image || defaultImg;

        const item = {
          id: skuId,
          sku: raw.sku || `RAW-${idx + 100}`,
          brand: brandKey,
          name: raw.name || 'Unlabeled Vendor Fashion Style',
          season: raw.season || 'Spring/Summer 2026',
          category: raw.category || 'Handbags',
          subCategory: raw.subCategory || 'Fashion Accessories',
          taxonomyPath: raw.taxonomyPath || 'Apparel & Accessories > Handbags',
          image: img,
          status: 'needs_review',
          completenessScore: 50,
          aiConfidence: 88,
          retailPriceUSD: parseFloat(raw.retailPriceUSD) || 395.00,
          supplierRawData: {
            vendorCode: `VND-IMP-${idx + 1}`,
            rawTitle: raw.name || raw.sku,
            notes: raw.vendorNotes || (raw.supplierRawData ? raw.supplierRawData.notes : 'Raw vendor sample notes.'),
            receivedDate: '2026-10-26'
          },
          attributes: formattedAttrs,
          copyByBrand: raw.copyByBrand || {
            [brandKey]: {
              title: raw.name,
              headline: `${brandObj.name} seasonal release.`,
              romance: raw.vendorNotes || 'High quality luxury fashion piece crafted with signature craftsmanship.',
              bullets: ['Authentic luxury construction', 'Multi-functional design', 'Refined hardware', 'Imported']
            }
          }
        };

        item.completenessScore = PIMSchemaValidator.calculateCompleteness(item);
        return item;
      });
    } else {
      // Simple CSV parser
      const lines = rawData.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());

      items = lines.slice(1).map((line, idx) => {
        // Handle basic quoted CSV fields
        const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
        const matches = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || line.split(',');
        const values = matches.map(m => m.replace(/^"|"$/g, '').trim());

        const row = {};
        headers.forEach((h, i) => { row[h] = values[i] || ''; });

        const brandKey = (row.Brand || row.brand || 'brand1').toLowerCase();
        let defaultImg = 'assets/Brand1Item1.png';
        if (brandKey === 'brand2') defaultImg = 'assets/Brand2Item7.png';
        if (brandKey === 'brand3') defaultImg = 'assets/Brand3Image13.png';
        let img = row.Image || row.image || defaultImg;

        const item = {
          id: `SKU-${row.SKU || 'CSV-' + idx}`,
          sku: row.SKU || `CSV-${idx + 100}`,
          brand: brandKey,
          name: row.Product_Name || 'Imported Fashion Item',
          season: row.Season || 'Spring 2026',
          category: row.Category || 'Handbags',
          subCategory: row.SubCategory || 'Leather Goods',
          taxonomyPath: `Apparel & Accessories > ${row.Category || 'Handbags'}`,
          image: img,
          status: 'needs_review',
          completenessScore: 50,
          aiConfidence: 89,
          retailPriceUSD: parseFloat(row.Retail_USD) || 395.00,
          supplierRawData: {
            vendorCode: `VND-CSV-${idx + 1}`,
            rawTitle: row.Product_Name,
            notes: row.Vendor_Notes || '',
            receivedDate: '2026-10-26'
          },
          attributes: {
            silhouette: { value: row.Silhouette || '', confidence: row.Silhouette ? 0.95 : 0, verified: false },
            primaryMaterial: { value: row.Primary_Material || '', confidence: row.Primary_Material ? 0.95 : 0, verified: false },
            hardwareFinish: { value: row.Hardware || '', confidence: row.Hardware ? 0.92 : 0, verified: false },
            closureType: { value: row.Closure || '', confidence: row.Closure ? 0.94 : 0, verified: false },
            colorName: { value: row.Color_Name || '', confidence: row.Color_Name ? 0.98 : 0, verified: false },
            colorHex: { value: row.Color_Hex || '#222222', confidence: 0.99, verified: false },
            dimensions: { value: row.Dimensions || '', confidence: row.Dimensions ? 0.90 : 0, verified: false },
            countryOfOrigin: { value: row.Country_Origin || '', confidence: row.Country_Origin ? 0.99 : 0, verified: false },
            hsTariffCode: { value: row.HS_Tariff_Code || '', confidence: row.HS_Tariff_Code ? 0.95 : 0, verified: false },
            careInstruction: { value: row.Care_Instruction || '', confidence: row.Care_Instruction ? 0.92 : 0, verified: false }
          }
        };

        item.completenessScore = PIMSchemaValidator.calculateCompleteness(item);
        return item;
      });
    }

    return items;
  }

  // Display Ingest Preview Summary
  function showIngestPreview(items) {
    state.pendingIngestItems = items;
    const b1Count = items.filter(i => i.brand === 'brand1').length;
    const b2Count = items.filter(i => i.brand === 'brand2').length;
    const b3Count = items.filter(i => i.brand === 'brand3').length;

    let sum = 0;
    items.forEach(i => sum += i.completenessScore);
    const avgScore = Math.round(sum / items.length);

    ingestPreviewSummary.style.display = 'block';
    ingestPreviewSummary.innerHTML = `
      <div style="font-weight: 700; color: var(--gold-dark); margin-bottom: 4px;">
        ✓ Feed Validated: ${items.length} Vendor SKUs Ready to Ingest
      </div>
      <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 6px;">
        Portfolio Breakdown: <strong>${b1Count} Brand One</strong> | <strong>${b2Count} Brand Two</strong> | <strong>${b3Count} Brand Three</strong>
      </div>
      <div style="font-size: 0.74rem; color: var(--text-muted);">
        Initial Average Completeness: <strong style="color: ${avgScore >= 70 ? 'var(--status-emerald)' : 'var(--status-amber)'}">${avgScore}%</strong> (Reflects missing vendor dimensions &amp; care specs)
      </div>
    `;

    confirmIngestBtn.disabled = false;
  }

  // Export Syndication Modal Handling
  function openExport() {
    const sku = getActiveSku();
    if (state.exportMode === 'json') {
      const jsonLd = PIMSchemaValidator.generateJSONLD(sku);
      exportCodeViewer.textContent = JSON.stringify(jsonLd, null, 2);
    } else {
      const csv = PIMSchemaValidator.generateCSV(state.catalog);
      exportCodeViewer.textContent = csv;
    }
    exportModal.classList.add('active');
  }

  function closeExport() {
    exportModal.classList.remove('active');
  }

  // Event Listeners Initialization
  function initEventListeners() {
    // Brand Filter Bar
    brandFilterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.brand-btn');
      if (!btn) return;

      brandFilterBar.querySelectorAll('.brand-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeBrandFilter = btn.dataset.brand;

      if (state.activeBrandFilter !== 'all') {
        const matching = state.catalog.find(i => i.brand === state.activeBrandFilter);
        if (matching) loadSkuIntoStudio(matching);
      }

      if (state.activeView === 'catalog') {
        renderCatalogTable();
      }
      showToast(`Filter set to: ${btn.textContent.trim()}`);
    });

    // View Tabs
    tabStudioBtn.addEventListener('click', () => switchView('studio'));
    tabCatalogBtn.addEventListener('click', () => switchView('catalog'));

    // Agent Trigger
    runAgentBtn.addEventListener('click', triggerAgenticEnrichment);

    // Bulk Enrich Button
    bulkEnrichBtn.addEventListener('click', triggerBulkEnrichment);

    // Catalog Table Filter & Sort Controls
    filterStatusSelect.addEventListener('change', (e) => {
      state.catalogStatusFilter = e.target.value;
      renderCatalogTable();
    });

    sortCompletenessSelect.addEventListener('change', (e) => {
      state.catalogSortMode = e.target.value;
      renderCatalogTable();
    });

    // Brand Voice Buttons
    brandVoiceSelector.addEventListener('click', (e) => {
      const btn = e.target.closest('.voice-btn');
      if (!btn) return;

      brandVoiceSelector.querySelectorAll('.voice-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeVoice = btn.dataset.voice;

      const sku = getActiveSku();
      renderBrandVoice(sku);
      updateCompletenessAndCompliance(sku);
      showToast(`Regenerated copy in ${BRANDS[state.activeVoice.toUpperCase()].name} voice`);
    });

    // Ingestion Modal Controls
    openIngestModalBtn.addEventListener('click', () => {
      ingestModal.classList.add('active');
    });

    closeIngestModalBtn.addEventListener('click', () => {
      ingestModal.classList.remove('active');
    });

    cancelIngestBtn.addEventListener('click', () => {
      ingestModal.classList.remove('active');
    });

    ingestModal.addEventListener('click', (e) => {
      if (e.target === ingestModal) ingestModal.classList.remove('active');
    });

    // 1-Click Load Pre-packaged Feed
    loadPrepackagedFeedBtn.addEventListener('click', () => {
      if (typeof RAW_VENDOR_FEED_ITEMS !== 'undefined' && RAW_VENDOR_FEED_ITEMS.length) {
        const parsed = parseRawVendorFeed(RAW_VENDOR_FEED_ITEMS, true);
        showIngestPreview(parsed);
        showToast('1-Click Luxury Feed loaded and ready to ingest!');
      } else {
        showToast('Feed definitions loaded.');
      }
    });

    // File Upload Handler
    triggerFileInputBtn.addEventListener('click', () => {
      vendorFileInput.click();
    });

    vendorFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      fileUploadStatus.textContent = `Selected: ${file.name} (${Math.round(file.size / 1024)} KB)`;
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target.result;
          const isJson = file.name.endsWith('.json');
          const parsed = parseRawVendorFeed(content, isJson);
          showIngestPreview(parsed);
          showToast(`Parsed ${parsed.length} SKUs from ${file.name}`);
        } catch (err) {
          showToast('Failed to parse file. Please verify valid JSON or CSV format.');
          console.error(err);
        }
      };

      reader.readAsText(file);
    });

    // Confirm Ingestion
    confirmIngestBtn.addEventListener('click', () => {
      if (!state.pendingIngestItems || !state.pendingIngestItems.length) return;

      // Merge into catalog (avoid duplicates by sku)
      const existingSkus = new Set(state.catalog.map(i => i.sku));
      let added = 0;

      state.pendingIngestItems.forEach(item => {
        if (!existingSkus.has(item.sku)) {
          state.catalog.push(item);
          existingSkus.add(item.sku);
          added++;
        }
      });

      refreshKPIs();
      ingestModal.classList.remove('active');
      switchView('catalog');
      showToast(`🎉 Ingested ${added} vendor SKUs into PIM! Catalog now has ${state.catalog.length} SKUs.`);
    });

    // Export Controls
    openExportBtn.addEventListener('click', openExport);
    closeModalBtn.addEventListener('click', closeExport);
    exportModal.addEventListener('click', (e) => {
      if (e.target === exportModal) closeExport();
    });

    tabExportJSON.addEventListener('click', () => {
      state.exportMode = 'json';
      tabExportJSON.classList.add('active');
      tabExportCSV.classList.remove('active');
      openExport();
    });

    tabExportCSV.addEventListener('click', () => {
      state.exportMode = 'csv';
      tabExportCSV.classList.add('active');
      tabExportJSON.classList.remove('active');
      openExport();
    });

    copyFeedBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(exportCodeViewer.textContent).then(() => {
        showToast('Feed payload copied to clipboard!');
      });
    });

    downloadFeedBtn.addEventListener('click', () => {
      const content = exportCodeViewer.textContent;
      const isJson = state.exportMode === 'json';
      const blob = new Blob([content], { type: isJson ? 'application/json' : 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = isJson ? `pim-syndication-${state.activeSkuId}.json` : 'luxury-catalog-export.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Syndication file downloaded successfully.');
    });
  }

  // Boot Application
  function init() {
    initEventListeners();
    refreshKPIs();
    loadSkuIntoStudio(state.catalog[0]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
