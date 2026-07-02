# Nuka-Soft Beverages — The Field Service Nerd Demo Company

> **Course Note**: Nuka-Soft is our fictional demo company — the Field Service Nerd equivalent of Microsoft's "Contoso." Every hands-on demo, work order, scheduling scenario, and IoT walkthrough in this course uses Nuka-Soft data. It's not Contoso. It's better.

---

## Why Nuka-Soft?

Microsoft uses Contoso. We use Nuka-Soft Beverages.

Contoso is forgettable. Nuka-Soft is a retrofuturistic soft drink company with rocket-shaped vending machines, an IoT-connected fleet of assets, a field service operation that spans multiple regions, and a brand ambassador named Rita Rivera who keeps the whole thing running with a smile and a wrench.

The scenarios are realistic. The data is real-world structured. The aesthetic makes you remember it.

---

## Company Profile

| Field | Value |
|---|---|
| **Company Name** | Nuka-Soft Beverages, Inc. |
| **Industry** | Beverage Manufacturing & Distribution |
| **Headquarters** | Capitol City, USA |
| **Size** | ~2,400 employees |
| **Field Operations** | 420 field technicians across 6 territories |
| **Asset Fleet** | 8,200+ active vending machines (the Rocket Bottle™ Dispensers) |
| **Annual Service Volume** | ~140,000 work orders per year |
| **Core Products** | Nuka-Soft Original, Nuka Cherry, Nuka Quantum, Nuka Grape |
| **Tagline** | *"One sip and you'll forget the bombs ever fell... almost."* |

Nuka-Soft distributes its beverages through three channels: retail partnerships, restaurant accounts, and its proprietary Rocket Bottle™ Dispenser vending machine network. The vending machine fleet is the company's largest field service obligation — and the primary vehicle for this course.

---

## Brand Ambassador: Rita Rivera

**Rita Rivera** is Nuka-Soft's official brand ambassador and the face of the company's field operations communications. She appears throughout training materials, internal comms, and course content.

- Rosie the Riveter meets atomic-age pin-up: confident, capable, cheerful
- Denim coveralls, red bandana, brass aviator goggles
- She's not just a mascot — she represents the Nuka-Soft field tech who shows up, gets the machine running, and makes it look good doing it
- In course materials, Rita is used to introduce new concepts, highlight key points, and humanize the field service role

> *"Rita says: A work order created is a promise made. A work order closed is a promise kept."*

---

## The Field Service Operation

### What Nuka-Soft Services

Nuka-Soft's field service organization is responsible for three primary asset categories:

1. **Rocket Bottle™ Dispensers** — The flagship vending machine. IoT-connected, refrigerated, coin/card payment enabled. The core service asset.
2. **Bottling Plant Equipment** — Production and filling line equipment at 4 regional bottling facilities.
3. **Delivery Fleet** — ~600 vehicles (Class 2-4 trucks) used for route distribution and machine restocking.

This course focuses primarily on the **Rocket Bottle™ Dispenser** service operation — it hits every D365 Field Service capability: IoT alerts, work orders, scheduling, RSO, mobile, and customer asset management.

---

## D365 Field Service Configuration

### Territories

| Territory Name | Region | Field Techs |
|---|---|---|
| Capitol Zone | Mid-Atlantic | 95 |
| Wasteland North | Northeast | 72 |
| Wasteland South | Southeast | 80 |
| Frontier West | Mountain/West | 68 |
| Great Plains | Midwest | 62 |
| Coastal Run | Pacific | 43 |

---

### Accounts & Service Locations

**Parent Accounts** (top-level customers):
- Nuka-Soft Corporate (internal fleet)
- Capitol Diner Group (restaurant chain — 180 locations)
- Vault Mart Retail Partners (big-box retail)
- Radiation Springs Hotel Group
- Route 101 Truck Stops

**Service Accounts** (individual machine locations — child accounts):
Each physical machine location is tracked as a Service Account with address, location type, and contact. Example: *"Capitol Diner #47 — Springfield"*

---

### Customer Assets: The Rocket Bottle™ Dispenser

Each vending machine in the fleet is a **Customer Asset** in D365:

| Field | Example Value |
|---|---|
| Asset Name | Rocket Bottle™ Dispenser |
| Serial Number | NSV-2847-CZ |
| Model | RBD-3000 / RBD-5000 (Quantum Edition) |
| Install Date | 2022-04-15 |
| Warranty Expiration | 2025-04-15 |
| Parent Account | Capitol Diner #47 |
| Territory | Capitol Zone |
| IoT Device ID | iot-nsv-2847-cz |
| Last PM Date | 2026-02-10 |

Asset sub-components tracked:
- Refrigeration Unit
- Payment Terminal (Coin + Card)
- Display Screen
- Rocket Fin Assembly (structural)
- Cap Dispensing Mechanism

---

### Work Order Types

| Work Order Type | Description | Typical Duration |
|---|---|---|
| PM – Quarterly | Scheduled preventive maintenance | 90 min |
| PM – Annual | Full annual inspection + deep clean | 180 min |
| CM – Machine Down | Corrective maintenance, machine not dispensing | 60–120 min |
| CM – Payment System | Card/coin reader failure | 45 min |
| CM – Refrigeration | Cooling failure or temperature alert | 90 min |
| CM – Display/Controls | Screen or control board failure | 60 min |
| Installation | New machine deployment | 240 min |
| Decommission | End-of-life removal | 120 min |
| IoT Response | Auto-generated from Connected Field Service alert | varies |
| Inspection | Compliance or quality check | 45 min |

---

### Incident Types

These map directly to D365 Incident Types and pre-populate work orders with tasks and products:

| Incident Type | Triggers | Tasks Auto-Added |
|---|---|---|
| Machine Not Dispensing | Customer call / IoT alert | Check fill level, inspect mechanism, test dispense |
| Refrigeration Failure | IoT temp sensor > 45°F | Check compressor, check refrigerant, test thermostat |
| Payment System Down | IoT payment timeout alert | Test card reader, test coin mech, reset terminal |
| Display Malfunction | Customer call | Power cycle, check connection, replace display board |
| Rocket Fin Damage | Site inspection / customer report | Assess structural damage, repair or replace fins |
| Quarterly PM | Scheduled trigger | Clean interior, test all systems, update firmware |
| New Machine Installation | Sales order | Site survey complete, deliver unit, install, configure IoT |

---

### Bookable Resources

**Resource Types used in demos:**

| Resource | Role | Skills |
|---|---|---|
| Rita Rivera | Field Tech Lead / Brand Ambassador | All certifications (she's the demo hero) |
| Marcus Webb | Senior Field Tech | Refrigeration Cert, IoT Config, Electrical |
| Dana Chu | Mid-Level Field Tech | Electrical, Payment Systems, IoT Basic |
| Tommy Ortega | Junior Field Tech | Basic Maintenance, Restocking |
| Parts Runner (Pool) | Logistics Resource | Parts Delivery |
| Service Manager – Capitol | Dispatcher/Manager | Crew Dispatch, Escalation |

**Resource Characteristics (Skills):**
- `Refrigeration Cert` — required for CM-Refrigeration work orders
- `IoT Device Config` — required for Installation and IoT Response
- `Electrical Cert` — required for CM-Display, CM-Payment
- `Hazmat Handling` — required for Nuka Quantum flavor line (radioactive blue glow)
- `Customer-Facing` — preferred for accounts in Capitol Zone

---

### Products / Parts Catalog (Sample)

| Product | Part Number | Used In |
|---|---|---|
| Compressor Unit – RBD3000 | NS-COMP-300 | CM-Refrigeration |
| Display Board Assembly | NS-DISP-200 | CM-Display |
| Coin Mechanism Kit | NS-COIN-150 | CM-Payment |
| Card Reader Module | NS-CARD-110 | CM-Payment |
| Rocket Fin Assembly (set of 4) | NS-FIN-400 | Structural repair |
| Cap Seal Kit | NS-CAP-050 | PM-Quarterly |
| IoT Gateway Module | NS-IOT-100 | Installation, IoT Response |
| Nuka-Soft Syrup Canister (Original) | NS-SYR-001 | Restock |
| Nuka Cherry Syrup Canister | NS-SYR-002 | Restock |
| Nuka Quantum Syrup Canister | NS-SYR-Q01 | Restock (Hazmat) |

---

## Sample Work Order Scenarios

### Scenario 1: IoT Alert → Auto Work Order
**Machine**: NSV-2847-CZ at Capitol Diner #47  
**Trigger**: IoT temperature sensor reports 52°F (threshold: 45°F) for 30 minutes  
**Result**: Connected Field Service auto-creates a CM-Refrigeration work order  
**Assignment**: RSO dispatches Marcus Webb (Refrigeration Cert, Capitol Zone)  
**Teaching points**: IoT alert → threshold rules → auto WO creation → RSO dispatch

---

### Scenario 2: RSO Scheduling Optimization
**Scenario**: 12 PM work orders open in Capitol Zone on Monday morning  
**Resources**: 4 techs available, varying skills, different start locations  
**Goal**: Demonstrate RSO run — minimize travel time, match skills, respect SLAs  
**Teaching points**: Resource requirements, scheduling constraints, RSO optimization goals, manual override

---

### Scenario 3: Preventive Maintenance Route
**Machine**: Quarterly PM due on 22 machines across Wasteland South territory  
**Resource**: Tommy Ortega (PM-qualified), full-day route  
**Teaching points**: Scheduled PMs, maintenance plan configuration, route grouping in RSO, mobile app completion flow

---

### Scenario 4: New Machine Installation
**Account**: Vault Mart Retail Partners — new store opening in Frontier West  
**Work Order Type**: Installation  
**Duration**: 4 hours, requires IoT Config cert  
**Resource**: Dana Chu + Parts Runner (pool)  
**Teaching points**: Multi-resource work orders, installation work order type, IoT onboarding, customer asset creation on completion

---

### Scenario 5: The Nuka Quantum Incident
**Machine**: RBD-5000 Quantum Edition — NSV-9001-GP (Great Plains territory)  
**Issue**: Machine dispensing blue glow without activating UV safety shield  
**Cert Required**: Hazmat Handling + IoT Config  
**Teaching points**: Required characteristics, skill matching, escalation path, Field Service + Safety compliance workflow

---

## IoT / Connected Field Service Architecture

Nuka-Soft's vending machine fleet is fully connected via Azure IoT Hub:

```
[Rocket Bottle™ Dispenser]
       ↓ (MQTT/HTTPS telemetry)
[Azure IoT Hub]
       ↓
[Connected Field Service Connector]
       ↓
[D365 Field Service — IoT Alerts]
       ↓
[Alert → Threshold Rule → Work Order auto-create]
       ↓
[RSO Dispatch → Field Tech Mobile App]
```

**Telemetry streams per machine:**
- `temp_internal` — refrigeration temperature (°F)
- `fill_level` — syrup canister fill % per flavor
- `payment_status` — card/coin system health
- `dispense_count` — daily/lifetime dispense counter
- `door_open` — tamper detection
- `firmware_version` — current firmware build

**IoT Alert types configured:**
- Temperature Breach (>45°F sustained 30 min)
- Low Fill Level (<15% on any canister)
- Payment System Offline (>15 min)
- Tamper Detected (door open outside service hours)

---

## How to Use Nuka-Soft in Course Modules

| Module | Nuka-Soft Scenario Used |
|---|---|
| Work Order Fundamentals | CM-Machine Down at Capitol Diner #47 |
| Scheduling & Dispatch | RSO run — Capitol Zone 12 open WOs |
| Customer Asset Management | Rocket Bottle™ fleet — asset hierarchy |
| Connected Field Service / IoT | Temperature breach alert → auto WO |
| Mobile Field Experience | Tommy Ortega's PM route — mobile app |
| RSO Deep Dive | Full optimization run — Wasteland South |
| Reporting & Analytics | Fleet health dashboard — all territories |
| Advanced Topics (Copilot) | AI-assisted work order creation from IoT alert |

---

## Brand Assets Available

All Nuka-Soft brand assets are in the `nuka-soft-brand` Cowork skill:

- `NukaSoft_Wordmark_Design2.png` — clean red/white logo for slide headers
- `NukaSoft_Log.png` — stacked logo with stars for feature cards
- `Rita_1.png` — Rita full-body with rocket bottle (transparent bg) — use for intro slides
- `Rita_Rivera.png` — Rita portrait/vintage tin sign style — use for chapter openers
- `Poster_1.png` — full poster composition — use for module cover pages

---

*Last updated: May 2026 | Field Service Nerd Course — fieldservicenerd.com*
