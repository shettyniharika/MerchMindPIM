/**
 * MerchMind PIM — Data Engineering Schema Validation & Quality Scoring Engine
 * Enforces enterprise data contracts, taxonomy mappings, and multi-channel readiness.
 */

const PIMSchemaValidator = {
  // Required core attributes for any active luxury fashion SKU
  CORE_SCHEMA: [
    { key: 'silhouette', label: 'Silhouette', weight: 10, required: true },
    { key: 'primaryMaterial', label: 'Primary Material', weight: 15, required: true },
    { key: 'hardwareFinish', label: 'Hardware Finish', weight: 8, required: true },
    { key: 'closureType', label: 'Closure Mechanism', weight: 10, required: true },
    { key: 'colorName', label: 'Colorway Name', weight: 8, required: true },
    { key: 'colorHex', label: 'Color Hex Code', weight: 5, required: true },
    { key: 'dimensions', label: 'Product Dimensions', weight: 12, required: true },
    { key: 'countryOfOrigin', label: 'Country of Origin', weight: 8, required: true },
    { key: 'hsTariffCode', label: 'HS Tariff Code', weight: 8, required: false },
    { key: 'careInstruction', label: 'Care & Cleaning', weight: 8, required: true },
    { key: 'strapType', label: 'Strap / Carry Profile', weight: 8, required: false }
  ],

  /**
   * Calculate PIM Completeness Score (0-100) based on weighted schema validation
   */
  calculateCompleteness(sku) {
    if (!sku || !sku.attributes) return 0;

    let totalPossibleWeight = 0;
    let earnedWeight = 0;

    // 1. Evaluate Core Attribute Quality
    this.CORE_SCHEMA.forEach(field => {
      totalPossibleWeight += field.weight;
      const attr = sku.attributes[field.key];
      if (attr && attr.value && String(attr.value).trim().length > 0) {
        // Boost score if verified by human or high AI confidence
        const confidenceFactor = attr.verified ? 1.0 : Math.max(0.7, attr.confidence || 0.8);
        earnedWeight += field.weight * confidenceFactor;
      }
    });

    // 2. Evaluate Copy & Marketing Assets (weight: 20)
    const activeBrand = sku.brand || 'brand1';
    const brandCopy = sku.copyByBrand ? (sku.copyByBrand[activeBrand] || sku.copyByBrand[activeBrand.toLowerCase()] || Object.values(sku.copyByBrand)[0]) : null;
    totalPossibleWeight += 20;

    if (brandCopy) {
      if (brandCopy.title && brandCopy.title.length >= 15) earnedWeight += 5;
      if (brandCopy.romance && brandCopy.romance.length >= 50) earnedWeight += 6;
      if (brandCopy.bullets && brandCopy.bullets.length >= 4) earnedWeight += 6;
      if (brandCopy.altText && brandCopy.altText.length >= 10) earnedWeight += 3;
    }

    // 3. Evaluate Digital Assets (weight: 10)
    totalPossibleWeight += 10;
    if (sku.image) earnedWeight += 10;

    return Math.round((earnedWeight / totalPossibleWeight) * 100);
  },

  /**
   * Validate SKU readiness for specific syndication channels
   */
  validateChannelCompliance(sku) {
    const activeBrand = sku.brand || 'brand1';
    const copy = sku.copyByBrand ? (sku.copyByBrand[activeBrand] || sku.copyByBrand[activeBrand.toLowerCase()] || Object.values(sku.copyByBrand)[0]) : null;
    const attrs = sku.attributes || {};

    const results = {
      shopify: { passed: true, score: 0, issues: [], channel: CHANNEL_RULES.shopify },
      wholesale: { passed: true, score: 0, issues: [], channel: CHANNEL_RULES.wholesale },
      marketplaces: { passed: true, score: 0, issues: [], channel: CHANNEL_RULES.marketplaces }
    };

    // DTC (Shopify Plus) Validation
    let shopifyPassed = 0;
    let shopifyTotal = 5;
    if (copy && copy.title && copy.title.length >= CHANNEL_RULES.shopify.minTitleLength && copy.title.length <= CHANNEL_RULES.shopify.maxTitleLength) {
      shopifyPassed++;
    } else {
      results.shopify.issues.push(`Title must be between ${CHANNEL_RULES.shopify.minTitleLength} and ${CHANNEL_RULES.shopify.maxTitleLength} chars`);
    }
    if (copy && copy.romance && copy.romance.length > 30) shopifyPassed++;
    else results.shopify.issues.push('Missing romance story copy');
    if (copy && copy.bullets && copy.bullets.length >= CHANNEL_RULES.shopify.minBulletPoints) shopifyPassed++;
    else results.shopify.issues.push(`Requires at least ${CHANNEL_RULES.shopify.minBulletPoints} bullet points`);
    if (attrs.primaryMaterial && attrs.primaryMaterial.value) shopifyPassed++;
    else results.shopify.issues.push('Missing primary material composition');
    if (attrs.dimensions && attrs.dimensions.value) shopifyPassed++;
    else results.shopify.issues.push('Missing product dimensions');

    results.shopify.score = Math.round((shopifyPassed / shopifyTotal) * 100);
    results.shopify.passed = results.shopify.score >= 80;

    // Luxury Wholesale (Saks / Nordstrom) Validation
    let wsPassed = 0;
    let wsTotal = 5;
    if (copy && copy.bullets && copy.bullets.length >= CHANNEL_RULES.wholesale.minBulletPoints) wsPassed++;
    else results.wholesale.issues.push(`Department store line sheet requires min ${CHANNEL_RULES.wholesale.minBulletPoints} bullet points`);
    if (attrs.countryOfOrigin && attrs.countryOfOrigin.value) wsPassed++;
    else results.wholesale.issues.push('Country of Origin mandatory for customs line sheet');
    if (attrs.careInstruction && attrs.careInstruction.value) wsPassed++;
    else results.wholesale.issues.push('Care instructions mandatory for wholesale spec');
    if (attrs.hsTariffCode && attrs.hsTariffCode.value) wsPassed++;
    else results.wholesale.issues.push('HS Harmonized Tariff Code recommended for wholesale logistics');
    if (sku.retailPriceUSD && sku.retailPriceUSD > 0) wsPassed++;
    else results.wholesale.issues.push('MSRP / Retail Price missing');

    results.wholesale.score = Math.round((wsPassed / wsTotal) * 100);
    results.wholesale.passed = results.wholesale.score >= 80;

    // Marketplaces (Zalando / Farfetch) Validation
    let mpPassed = 0;
    let mpTotal = 4;
    if (copy && copy.altText && copy.altText.length >= 10) mpPassed++;
    else results.marketplaces.issues.push('Accessibility Alt-Text required for marketplace indexing');
    if (attrs.colorHex && attrs.colorHex.value) mpPassed++;
    else results.marketplaces.issues.push('Standard HEX color value missing for faceted search');
    if (sku.season) mpPassed++;
    else results.marketplaces.issues.push('Season code missing');
    if (sku.taxonomyPath && sku.taxonomyPath.includes('>')) mpPassed++;
    else results.marketplaces.issues.push('Multi-tier taxonomy path not assigned');

    results.marketplaces.score = Math.round((mpPassed / mpTotal) * 100);
    results.marketplaces.passed = results.marketplaces.score >= 75;

    return results;
  },

  /**
   * Export SKU as standard Schema.org Product JSON-LD for rich snippets and e-commerce APIs
   */
  generateJSONLD(sku) {
    const brand = BRANDS[sku.brand.toUpperCase()] || BRANDS.BRAND1 || { name: 'Luxury Brand' };
    const copy = sku.copyByBrand ? (sku.copyByBrand[sku.brand] || Object.values(sku.copyByBrand)[0]) : {};
    const attrs = sku.attributes || {};

    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      "sku": sku.sku,
      "name": copy.title || sku.name,
      "image": [
        window.location.origin + '/' + sku.image
      ],
      "description": copy.romance || "",
      "brand": {
        "@type": "Brand",
        "name": brand.name
      },
      "category": sku.taxonomyPath,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": sku.retailPriceUSD || 0,
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition"
      },
      "additionalProperty": [
        { "@type": "PropertyValue", "name": "Silhouette", "value": attrs.silhouette?.value },
        { "@type": "PropertyValue", "name": "Primary Material", "value": attrs.primaryMaterial?.value },
        { "@type": "PropertyValue", "name": "Hardware Finish", "value": attrs.hardwareFinish?.value },
        { "@type": "PropertyValue", "name": "Closure Type", "value": attrs.closureType?.value },
        { "@type": "PropertyValue", "name": "Color Name", "value": attrs.colorName?.value },
        { "@type": "PropertyValue", "name": "Dimensions", "value": attrs.dimensions?.value },
        { "@type": "PropertyValue", "name": "Country of Origin", "value": attrs.countryOfOrigin?.value },
        { "@type": "PropertyValue", "name": "HS Tariff Code", "value": attrs.hsTariffCode?.value }
      ].filter(prop => prop.value)
    };
  },

  /**
   * Generate CSV format for enterprise ERP / PIM batch export
   */
  generateCSV(catalog) {
    const headers = [
      'SKU', 'Brand', 'Product_Name', 'Status', 'Completeness_Score', 'Retail_MSRP',
      'Silhouette', 'Primary_Material', 'Hardware', 'Closure', 'Color_Name', 'Color_Hex',
      'Dimensions', 'Origin', 'HS_Code', 'SEO_Title', 'Romance_Copy'
    ];

    const rows = catalog.map(item => {
      const copy = item.copyByBrand ? item.copyByBrand[item.brand] : {};
      const attrs = item.attributes || {};

      const escape = (str) => `"${String(str || '').replace(/"/g, '""')}"`;

      return [
        escape(item.sku),
        escape(BRANDS[item.brand.toUpperCase()]?.name || item.brand),
        escape(item.name),
        escape(item.status),
        escape(item.completenessScore + '%'),
        escape('$' + item.retailPriceUSD),
        escape(attrs.silhouette?.value),
        escape(attrs.primaryMaterial?.value),
        escape(attrs.hardwareFinish?.value),
        escape(attrs.closureType?.value),
        escape(attrs.colorName?.value),
        escape(attrs.colorHex?.value),
        escape(attrs.dimensions?.value),
        escape(attrs.countryOfOrigin?.value),
        escape(attrs.hsTariffCode?.value),
        escape(copy.title),
        escape(copy.romance)
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }
};
