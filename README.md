# MerchMind PIM 👜✨
### Autonomous Fashion Catalog Enrichment, Brand-Voice Copilot & Enterprise Data Quality Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Domain: Luxury Fashion PIM](https://img.shields.io/badge/Domain-Luxury%20Fashion%20PIM-d4af37.svg)](#)
[![Data Engineering: Schema Contracts](https://img.shields.io/badge/Data%20Eng-Schema%20Contracts%20%26%20Validation-10b981.svg)](#)

> **MerchMind** is an enterprise-grade AI Copilot and Data Quality Engine designed for luxury multi-brand retail holding companies (managing luxury portfolio brands: *Brand One*, *Brand Two*, and *Brand Three*). It bridges **Data Engineering governance** with **Multimodal AI** to eliminate manual catalog ingestion bottlenecks.

---

## 🎯 The Real-World Problem It Solves

In luxury fashion and apparel e-commerce:
1. **Messy Supplier Feeds**: Factory spec sheets and vendor notes arrive unstructured, missing critical technical attributes (leather finish, closure mechanism, hardware plating, exact strap drop dimensions).
2. **Multi-Brand Voice Inconsistency**: A single holding company operates brands with radically different brand voices:
   - **Brand One**: Timeless luxury craftsmanship, heritage saddlery, tactile glovetanned leather.
   - **Brand Two**: Optimistic femininity, playful wit, vibrant conversational charm.
   - **Brand Three**: High-fashion architectural engineering, red-carpet elegance.
   Writing and maintaining differentiated product copy manually across thousands of seasonal SKUs causes weeks of launch delay.
3. **Multi-Channel Syndication Non-Compliance**: Direct-to-Consumer (Shopify Plus), Luxury Wholesale (Saks Fifth Avenue, Nordstrom line sheets), and Global Marketplaces (Farfetch, Zalando) each enforce strict, conflicting data schemas and mandatory fields. Non-compliant feeds lead to SKU rejections and penalties.

---

## ⚡ What MerchMind Does

```
                ┌──────────────────────────────────────────────┐
                │        Raw Ingestion & Image Asset           │
                │  (Messy Vendor Spec + High-Res Product Shot) │
                └──────────────────────┬───────────────────────┘
                                       │
                                       ▼
                ┌──────────────────────────────────────────────┐
                │         Multimodal Vision Pipeline           │
                │  - Silhouette & hardware segmentation        │
                │  - Grain recognition (pebbled, suede, faille)│
                │  - Pinpoint visual confidence tokenization   │
                └──────────────────────┬───────────────────────┘
                                       │
                                       ▼
                ┌──────────────────────────────────────────────┐
                │          DE Schema Validation Engine         │
                │  - GS1 Fashion Taxonomy Reconciliation       │
                │  - Weighted completeness scoring (0-100%)    │
                │  - Channel compliance (DTC, Saks, Farfetch)  │
                └──────────────────────┬───────────────────────┘
                                       │
                                       ▼
                ┌──────────────────────────────────────────────┐
                │        Multi-Brand Tone Conditioning         │
                │  - Brand One: Heritage & craftsmanship       │
                │  - Brand Two: Playful optimism & wit         │
                │  - Brand Three: Sculptural elegance          │
                └──────────────────────┬───────────────────────┘
                                       │
                                       ▼
                ┌──────────────────────────────────────────────┐
                │         Syndication & Human-in-the-Loop      │
                │  - 1-Click human verification overrides      │
                │  - Schema.org JSON-LD & ERP/CSV Flat Feeds   │
                └──────────────────────────────────────────────┘
```

1. **Multimodal Attribute Recognition**:
   - Analyzes product photography to detect silhouettes (satchel, box tote, sock bootie), material textures (glovetanned pebble leather, floral jacquard, velour suede), and hardware types (antique brass turnlocks, pale gold emblems, faceted heels).
   - Generates interactive visual pins with confidence scores.

2. **Enterprise Schema Contracts & Quality Scoring**:
   - Calculates real-time **Completeness Scores (0–100%)** based on weighted PIM rules.
   - Runs channel-specific validation gates for **Shopify Plus**, **Luxury Department Stores (Saks/Nordstrom)**, and **Global Marketplaces**.

3. **Conditioned Multi-Brand Copywriting**:
   - One-click regeneration of romance copy, feature bullets, SEO titles, and accessibility alt-text tailored to each brand's voice guidelines.

4. **Human-in-the-Loop Review & Auditability**:
   - PIM operators can toggle attributes between "AI Generated" and "Human Verified" with instant score recalibration.
   - Instant syndication export to **Schema.org JSON-LD** and **CSV flat file**.

---

## 🛠️ Technology Stack & Architecture

- **Core**: Vanilla ES6+ JavaScript (State machine, reactive data pipeline, validation modules).
- **Styling**: Vanilla CSS Design System with a light luxury editorial atelier aesthetic (warm Italian linen, polished champagne gold, obsidian serif typography), glassmorphism (`backdrop-filter`), and responsive layouts.
- **Typography**: `Plus Jakarta Sans` for clean data tables + `Playfair Display` for luxury editorial titles.
- **Zero Heavy Dependencies**: 100% portable, lightning-fast initial load (<50ms), and zero build step required.

---

## 📁 Repository Structure

```
MerchMindPIM/
├── assets/                     # 18 high-resolution luxury product studio photos (Brand 1, 2, 3)
├── index.html                  # Semantic layout, KPI dashboard, dual-panel studio & catalog grid
├── style.css                   # Editorial light luxury design system & glassmorphism
├── catalog-data.js             # Realistic multi-brand master taxonomy & 18 domain SKUs
├── schema-validator.js         # DE module: channel contracts & scoring engine
├── app.js                      # Reactive state orchestration & multimodal AI pipeline
├── vendor_feed_raw.json        # 18-SKU vendor ingestion feed (JSON)
├── vendor_feed_raw.csv         # 18-SKU vendor ingestion feed (CSV)
├── .gitignore                  # Git ignore rules for clean OS-agnostic repository
├── LICENSE                     # MIT License
└── README.md                   # Enterprise architecture documentation
```

---

## 🌐 Live Web Demo (GitHub Pages)

Because MerchMind PIM is built with pure, high-performance web standards, it can be hosted live with **1-click GitHub Pages**:
1. In your GitHub repository, go to **Settings ➔ Pages**.
2. Under **Branch**, select `main` and root `/`, then click **Save**.
3. Your live interactive portfolio demo will be available immediately at:
   `https://<your-username>.github.io/<repo-name>/`

---

## 🚀 Running the Project Locally

No `npm install` or complex build scripts needed!

1. Clone or open this folder:
   ```bash
   cd ~/Desktop/"antigravity space"/MerchMindPIM
   ```
2. Open `index.html` in your browser:
   ```bash
   open index.html
   ```
   Or run a local static server if preferred:
   ```bash
   npx serve .
   ```

---

## 💡 How This Showcases Your Unique Skills (For Interviews & Recruiters)

When recruiters and hiring managers review this project, it stands out because:
- **Enterprise Domain Mastery**: You demonstrate deep, practical knowledge of PIM architecture, GS1 retail taxonomy, and the multi-brand governance challenges at enterprise luxury holding companies.
- **Data Engineering Rigor**: You enforce schema contracts, handle dirty vendor ingestion feeds (missing attributes, unparsed dimensions, tariff codes), and implement weighted data quality scoring.
- **Applied Multimodal AI**: Rather than a generic chatbot or API wrapper, you engineered an interactive, multi-step copilot combining multimodal vision tokenization, brand-tone conditioning, and human-in-the-loop review.
- **Executive Polish**: A state-of-the-art light luxury design that proves you build software with high attention to user experience, performance, and aesthetic standards.
