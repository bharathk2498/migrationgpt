# ClientPulse - Real-Time Project Intelligence Dashboard

**Enterprise-grade project monitoring platform for Trianz Digital clients**

![ClientPulse Dashboard](https://img.shields.io/badge/Status-Live-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue)

---

## **🎯 Overview**

ClientPulse is a premium real-time project monitoring dashboard that provides clients with instant visibility into project health, budget tracking, sprint progress, and team performance. Built for Trianz Digital consulting projects.

## **✨ Features**

### **Core Capabilities**
- **📊 Project Health Score** - Real-time 87-point health scoring system
- **💰 Budget Tracking** - Live spend tracking with $76K total budget visualization
- **⚡ Sprint Progress** - Real-time sprint 4 monitoring with story point analytics
- **🎯 Deliverables Timeline** - Visual timeline of upcoming milestones
- **👥 Team Utilization** - Live team capacity tracking (92% avg utilization)
- **🚨 Active Alerts** - Real-time risk and issue notifications
- **📈 Velocity Trends** - Historical sprint performance analytics

### **Premium UI/UX**
- **Glassmorphism Design** - Ultra-premium frosted glass aesthetics
- **Animated Progress Bars** - Shimmer effects and smooth transitions
- **Live Updates** - Real-time timestamp updates every second
- **Responsive Layout** - Perfect on desktop, tablet, and mobile
- **Interactive Charts** - Chart.js visualizations with hover effects
- **Gradient Text Effects** - Eye-catching animated gradients
- **3D Card Hover** - Depth and movement on interaction

## **🚀 Live Demo**

**Access the dashboard:** https://bharathk2498.github.io/migrationgpt/clientpulse/

### **Demo Project: PG&E Elderberry Modernization**
- Budget: $76,000 (8-week pilot)
- Timeline: 23 days remaining
- Health Score: 87/100 (Excellent)
- Team: 4 core members + extended team
- Sprint: Sprint 4 (3 days left)

## **📱 Screenshots**

### Dashboard Overview
![Dashboard](https://via.placeholder.com/800x400/1e293b/ffffff?text=ClientPulse+Dashboard)

### Key Metrics
- **Health Score Circle** - Animated conic gradient with pulsing effect
- **Budget Doughnut Chart** - Spent vs. Remaining visualization
- **Sprint Bar Chart** - Story point distribution
- **Velocity Line Chart** - Planned vs. Actual velocity trend

## **🛠️ Technology Stack**

| Component | Technology |
|-----------|-----------|
| **Framework** | Vanilla JavaScript (No build required) |
| **Styling** | Tailwind CSS 3.x |
| **Charts** | Chart.js 4.4.0 |
| **Icons** | Lucide Icons |
| **Animation** | GSAP 3.12.2 |
| **Fonts** | Google Fonts (Inter) |
| **Hosting** | GitHub Pages |

## **🎨 Design System**

### Color Palette
```css
--primary: #0ea5e9    /* Sky Blue */
--success: #10b981    /* Emerald Green */
--warning: #f59e0b    /* Amber */
--danger: #ef4444     /* Red */
--purple: #8b5cf6     /* Purple */
```

### Typography
- **Primary Font:** Inter (300-900 weights)
- **Monospace:** System default for timestamps

### Effects
- **Glassmorphism:** `backdrop-filter: blur(20px)`
- **Card Hover:** `translateY(-4px)` with glow shadow
- **Shimmer Animation:** 2s infinite progress bars
- **Pulse Animation:** 3s health score circle

## **📊 Metrics Displayed**

| Metric | Value | Status |
|--------|-------|--------|
| Project Health | 87/100 | Excellent |
| Days Remaining | 23 days | On Track |
| Budget Used | 78% ($59K) | Healthy |
| Sprint Velocity | 12 points | +2 pts |
| Deliverables | 94% (34/36) | On Track |
| Team Utilization | 86% avg | Optimal |

## **🔔 Alert System**

### Active Alerts (Real-time)
1. **Resource Constraint** - DevOps engineer leave mitigation
2. **UAT Feedback Pending** - 3 user stories awaiting approval
3. **Milestone Approaching** - Phase 2 completion Jan 15, 2026

## **📅 Deliverables Timeline**

| Deliverable | Status | Date |
|-------------|--------|------|
| Aurora Migration - Dev | ✅ Completed | Jan 2, 2026 |
| Container Setup - QA | ⏳ In Progress (85%) | Jan 8, 2026 |
| DevOps Pipeline | 📋 Scheduled | Jan 12, 2026 |
| Security Audit Report | 📋 Scheduled | Jan 15, 2026 |

## **👥 Team Members**

- **Hariharan P.** - 92% utilization
- **Vipul Kumar** - 88% utilization
- **Madhurima S.** - 85% utilization
- **Bharath K.** - 78% utilization

## **⚡ Performance**

- **Load Time:** < 1 second
- **First Paint:** < 500ms
- **Interactive:** Immediate
- **Chart Render:** < 100ms
- **Real-time Updates:** Every 1 second

## **🔧 Customization**

### Update Project Data
Edit the JavaScript charts in `index.html`:

```javascript
// Budget Chart - Line 545
datasets: [{
    data: [59000, 17000],  // [Spent, Remaining]
}]

// Sprint Chart - Line 560
datasets: [{
    data: [17, 3, 2, 0],  // [Done, In Progress, Todo, Blocked]
}]

// Velocity Chart - Line 585
datasets: [
    { data: [10, 12, 12, 14] },  // Planned
    { data: [8, 11, 10, 12] }     // Actual
]
```

### Change Project Name
Update line 264:
```html
<p class="text-sm font-semibold">Your Project Name</p>
<p class="text-xs text-gray-400">Project Description</p>
```

## **📦 Deployment**

### GitHub Pages (Current)
```bash
# Already deployed at:
https://bharathk2498.github.io/migrationgpt/clientpulse/
```

### Custom Domain
1. Add CNAME file to repository
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages settings

### Self-Hosting
```bash
# Clone repository
git clone https://github.com/bharathk2498/migrationgpt.git

# Navigate to clientpulse
cd migrationgpt/clientpulse

# Open in browser
open index.html
```

## **🔐 Security**

- ✅ 100% client-side (no backend required)
- ✅ No API keys or secrets
- ✅ No data persistence (demo mode)
- ✅ HTTPS enabled on GitHub Pages
- ✅ No third-party analytics

## **🎯 Use Cases**

### For Clients
- Monitor project health at a glance
- Track budget spend in real-time
- View upcoming deliverables
- See team capacity

### For Project Managers
- Present status to stakeholders
- Identify risks early
- Track sprint velocity
- Manage team utilization

### For Executives
- Portfolio health overview
- Budget compliance monitoring
- Delivery timeline tracking
- Risk mitigation status

## **🚀 Roadmap**

- [ ] Multi-project dashboard
- [ ] Export to PDF/Excel
- [ ] Integration with Jira/Azure DevOps
- [ ] Custom alert thresholds
- [ ] Historical data comparison
- [ ] Team member drill-down
- [ ] Client feedback module
- [ ] Mobile app (PWA)

## **📄 License**

MIT License - Free for commercial use

## **👨‍💻 Author**

**Bharath Kumar**
- Role: Project Manager, Trianz Digital Consulting
- Project: PG&E Elderberry Modernization
- GitHub: [@bharathk2498](https://github.com/bharathk2498)

## **🙏 Acknowledgments**

Built for **Trianz Digital Consulting** to provide clients with world-class project transparency.

**Powered by:**
- Chart.js for beautiful visualizations
- Tailwind CSS for rapid styling
- Lucide Icons for crisp iconography
- GSAP for smooth animations

---

**⭐ Star this repo if you find it useful!**

**🔗 Live Demo:** https://bharathk2498.github.io/migrationgpt/clientpulse/

**📧 Questions?** Open an issue or contact Bharath Kumar
