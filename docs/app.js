// Global state
let currentAssessment = null;
let allAssessments = [];

// OS Lifecycle Database
const osDatabase = {
    // Windows Server
    'windows server 2025': { status: 'Active', eol: '2034-10-13', upgradePath: 'Current', color: '#10b981' },
    'windows server 2022': { status: 'Active', eol: '2031-10-13', upgradePath: 'Windows Server 2025', color: '#10b981' },
    'windows server 2019': { status: 'Active', eol: '2029-01-09', upgradePath: 'Windows Server 2022', color: '#10b981' },
    'windows server 2016': { status: 'Extended', eol: '2027-01-12', upgradePath: 'Windows Server 2022', color: '#f59e0b' },
    'windows server 2012 r2': { status: 'EOL', eol: '2023-10-10', upgradePath: 'Windows Server 2022', color: '#ef4444' },
    'windows server 2012': { status: 'EOL', eol: '2023-10-10', upgradePath: 'Windows Server 2022', color: '#ef4444' },
    'windows server 2008 r2': { status: 'EOL', eol: '2020-01-14', upgradePath: 'Windows Server 2022', color: '#ef4444' },
    
    // RHEL
    'rhel 9': { status: 'Active', eol: '2032-05-31', upgradePath: 'Current', color: '#10b981' },
    'rhel 8': { status: 'Active', eol: '2029-05-31', upgradePath: 'RHEL 9', color: '#10b981' },
    'rhel 7': { status: 'Extended', eol: '2024-06-30', upgradePath: 'RHEL 8', color: '#f59e0b' },
    'rhel 6': { status: 'EOL', eol: '2020-11-30', upgradePath: 'RHEL 8', color: '#ef4444' },
    
    // CentOS
    'centos 8': { status: 'EOL', eol: '2021-12-31', upgradePath: 'RHEL 8', color: '#ef4444' },
    'centos 7': { status: 'Extended', eol: '2024-06-30', upgradePath: 'RHEL 8', color: '#f59e0b' },
    'centos 6': { status: 'EOL', eol: '2020-11-30', upgradePath: 'RHEL 8', color: '#ef4444' },
    
    // Ubuntu
    'ubuntu 22.04': { status: 'Active', eol: '2032-04-01', upgradePath: 'Current', color: '#10b981' },
    'ubuntu 20.04': { status: 'Active', eol: '2030-04-01', upgradePath: 'Ubuntu 22.04', color: '#10b981' },
    'ubuntu 18.04': { status: 'Extended', eol: '2028-04-01', upgradePath: 'Ubuntu 22.04', color: '#f59e0b' },
    'ubuntu 16.04': { status: 'EOL', eol: '2021-04-01', upgradePath: 'Ubuntu 22.04', color: '#ef4444' },
    
    // Debian
    'debian 12': { status: 'Active', eol: '2028-06-01', upgradePath: 'Current', color: '#10b981' },
    'debian 11': { status: 'Active', eol: '2026-06-01', upgradePath: 'Debian 12', color: '#10b981' },
    'debian 10': { status: 'Extended', eol: '2024-06-01', upgradePath: 'Debian 11', color: '#f59e0b' }
};

// Normalize OS version
function normalizeOSVersion(os) {
    if (!os) return 'unknown';
    const normalized = os.toLowerCase().trim();
    
    // Try exact match first
    if (osDatabase[normalized]) return normalized;
    
    // Pattern matching
    const patterns = [
        { regex: /windows.*2025/i, key: 'windows server 2025' },
        { regex: /windows.*2022/i, key: 'windows server 2022' },
        { regex: /windows.*2019/i, key: 'windows server 2019' },
        { regex: /windows.*2016/i, key: 'windows server 2016' },
        { regex: /windows.*2012\s*r2/i, key: 'windows server 2012 r2' },
        { regex: /windows.*2012/i, key: 'windows server 2012' },
        { regex: /windows.*2008\s*r2/i, key: 'windows server 2008 r2' },
        { regex: /rhel.*9/i, key: 'rhel 9' },
        { regex: /rhel.*8/i, key: 'rhel 8' },
        { regex: /rhel.*7/i, key: 'rhel 7' },
        { regex: /rhel.*6/i, key: 'rhel 6' },
        { regex: /centos.*8/i, key: 'centos 8' },
        { regex: /centos.*7/i, key: 'centos 7' },
        { regex: /centos.*6/i, key: 'centos 6' },
        { regex: /ubuntu.*22\.04/i, key: 'ubuntu 22.04' },
        { regex: /ubuntu.*20\.04/i, key: 'ubuntu 20.04' },
        { regex: /ubuntu.*18\.04/i, key: 'ubuntu 18.04' },
        { regex: /ubuntu.*16\.04/i, key: 'ubuntu 16.04' },
        { regex: /debian.*12/i, key: 'debian 12' },
        { regex: /debian.*11/i, key: 'debian 11' },
        { regex: /debian.*10/i, key: 'debian 10' }
    ];
    
    for (const pattern of patterns) {
        if (pattern.regex.test(os)) return pattern.key;
    }
    
    return 'unknown';
}

// 7R Classification
function classify7RStrategy(vm) {
    const osInfo = osDatabase[vm.normalizedOS];
    const hasDB = vm.database && vm.database.toLowerCase() !== 'none';
    const isProd = vm.environment && vm.environment.toLowerCase().includes('prod');
    
    if (!osInfo || osInfo.status === 'EOL') {
        return { strategy: 'Replatform', confidence: isProd ? 92 : 88 };
    } else if (osInfo.status === 'Extended') {
        return { strategy: hasDB ? 'Replatform' : 'Rehost', confidence: 85 };
    } else {
        return { strategy: 'Rehost', confidence: isProd ? 95 : 90 };
    }
}

// Cost Calculation
function calculateCosts(vms) {
    let currentCost = 0;
    let awsOnDemand = 0;
    let awsBYOL = 0;
    
    vms.forEach(vm => {
        // Current on-prem (rough estimate: $200/VM/month)
        const vmCost = 200 + (vm.cpu * 10) + (vm.memory * 2) + (vm.storage * 0.5);
        currentCost += vmCost;
        
        // AWS On-Demand
        const awsCost = vmCost * 1.3; // 30% premium for on-demand
        awsOnDemand += awsCost;
        
        // AWS BYOL (30% savings)
        awsBYOL += vmCost * 0.7;
    });
    
    return {
        current: Math.round(currentCost),
        awsOnDemand: Math.round(awsOnDemand),
        awsBYOL: Math.round(awsBYOL),
        savings: Math.round(currentCost - awsBYOL),
        savingsPercent: Math.round(((currentCost - awsBYOL) / currentCost) * 100)
    };
}

// AWS Funding Calculator
function calculateAWSFunding(vms, costs) {
    const vmCount = vms.length;
    const isvFunding = vmCount * 50; // $50 per VM
    const assessCredit = costs.current * 0.05; // 5% of current costs
    const mobilizeCredit = costs.current * 0.20; // 20% of current costs
    const migrateCredit = costs.current * 0.25; // 25% of current costs
    
    const totalFunding = isvFunding + assessCredit + mobilizeCredit + migrateCredit;
    const firstYearCost = costs.awsBYOL;
    const netCost = firstYearCost - totalFunding;
    
    return {
        isvFunding,
        assessCredit,
        mobilizeCredit,
        migrateCredit,
        totalFunding: Math.round(totalFunding),
        coverage: Math.round((totalFunding / firstYearCost) * 100),
        netYear1: Math.round(netCost)
    };
}

// File Processing
async function processFile(file) {
    showLoadingIndicator();
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                
                if (jsonData.length === 0) {
                    throw new Error('File is empty');
                }
                
                // Validate required columns
                const requiredColumns = ['VM Name', 'OS', 'CPU', 'Memory', 'Storage'];
                const firstRow = jsonData[0];
                const missingColumns = requiredColumns.filter(col => !Object.keys(firstRow).some(key => key.toLowerCase().includes(col.toLowerCase())));
                
                if (missingColumns.length > 0) {
                    throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
                }
                
                hideLoadingIndicator();
                const analysis = analyzeInventory(jsonData);
                resolve(analysis);
            } catch (error) {
                hideLoadingIndicator();
                reject(error);
            }
        };
        
        reader.onerror = () => {
            hideLoadingIndicator();
            reject(new Error('Failed to read file'));
        };
        
        reader.readAsArrayBuffer(file);
    });
}

// Analyze Inventory
function analyzeInventory(data) {
    const vms = data.map((row, index) => {
        const normalizedOS = normalizeOSVersion(row['OS'] || row['Operating System'] || '');
        const osInfo = osDatabase[normalizedOS] || { status: 'Unknown', eol: 'N/A', upgradePath: 'Unknown', color: '#6b7280' };
        const strategy = classify7RStrategy({
            normalizedOS,
            database: row['Database'] || row['DB'],
            environment: row['Environment'] || row['Env']
        });
        
        return {
            name: row['VM Name'] || row['Name'] || `VM-${index + 1}`,
            os: row['OS'] || row['Operating System'] || 'Unknown',
            normalizedOS,
            cpu: parseInt(row['CPU'] || row['vCPU'] || 2),
            memory: parseInt(row['Memory'] || row['RAM'] || 4),
            storage: parseInt(row['Storage'] || row['Disk'] || 100),
            datacenter: row['Datacenter'] || row['DC'] || 'Unknown',
            environment: row['Environment'] || row['Env'] || 'Production',
            database: row['Database'] || row['DB'] || 'None',
            osStatus: osInfo.status,
            eol: osInfo.eol,
            upgradePath: osInfo.upgradePath,
            color: osInfo.color,
            strategy: strategy.strategy,
            confidence: strategy.confidence
        };
    });
    
    // Calculate statistics
    const totalVMs = vms.length;
    const osBreakdown = {};
    const strategyBreakdown = {};
    const criticalServers = [];
    
    vms.forEach(vm => {
        // OS breakdown
        osBreakdown[vm.osStatus] = (osBreakdown[vm.osStatus] || 0) + 1;
        
        // Strategy breakdown
        strategyBreakdown[vm.strategy] = (strategyBreakdown[vm.strategy] || 0) + 1;
        
        // Critical servers
        if (vm.osStatus === 'EOL' || vm.osStatus === 'Extended') {
            criticalServers.push({
                ...vm,
                priority: vm.osStatus === 'EOL' ? 'Critical' : 'High'
            });
        }
    });
    
    const costs = calculateCosts(vms);
    const funding = calculateAWSFunding(vms, costs);
    
    return {
        vms,
        summary: {
            totalVMs,
            criticalEOL: osBreakdown['EOL'] || 0,
            extendedSupport: osBreakdown['Extended'] || 0,
            activeOS: osBreakdown['Active'] || 0,
            cloudReady: Math.round((osBreakdown['Active'] || 0) / totalVMs * 100),
            osBreakdown,
            strategyBreakdown,
            criticalServers: criticalServers.sort((a, b) => {
                if (a.priority === b.priority) return 0;
                return a.priority === 'Critical' ? -1 : 1;
            })
        },
        costs,
        funding,
        timestamp: new Date().toISOString()
    };
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // File upload
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    
    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const analysis = await processFile(file);
                currentAssessment = analysis;
                displayResults(analysis);
                saveAssessment(analysis);
                showView('dashboard');
                showToast('Assessment completed successfully!', 'success');
            } catch (error) {
                showToast(error.message, 'error');
            }
        }
    });
    
    // Drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', async (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            try {
                const analysis = await processFile(file);
                currentAssessment = analysis;
                displayResults(analysis);
                saveAssessment(analysis);
                showView('dashboard');
                showToast('Assessment completed successfully!', 'success');
            } catch (error) {
                showToast(error.message, 'error');
            }
        }
    });
    
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Load saved assessments
    loadAssessments();
});

// Display Results
function displayResults(analysis) {
    renderMetrics(analysis);
    renderCharts(analysis);
    renderRiskTable(analysis);
}

// Render Metrics
function renderMetrics(analysis) {
    const container = document.getElementById('metricsContainer');
    const metrics = [
        { 
            label: 'Total VMs', 
            value: analysis.summary.totalVMs, 
            icon: 'server',
            gradient: 'from-blue-500 to-cyan-500'
        },
        { 
            label: 'Funding Coverage', 
            value: `${analysis.funding.coverage}%`, 
            icon: 'shield-check',
            gradient: 'from-green-500 to-emerald-500'
        },
        { 
            label: 'Cost Reduction', 
            value: `${analysis.costs.savingsPercent}%`, 
            icon: 'trending-down',
            gradient: 'from-purple-500 to-pink-500'
        },
        { 
            label: 'Critical EOL', 
            value: analysis.summary.criticalEOL, 
            icon: 'alert-triangle',
            gradient: 'from-red-500 to-orange-500'
        },
        { 
            label: 'Cloud Ready', 
            value: `${analysis.summary.cloudReady}%`, 
            icon: 'cloud-check',
            gradient: 'from-cyan-500 to-blue-500'
        },
        { 
            label: 'Timeline', 
            value: '8-12 weeks', 
            icon: 'calendar',
            gradient: 'from-orange-500 to-yellow-500'
        }
    ];
    
    container.innerHTML = metrics.map(metric => `
        <div class="metric-card">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center">
                    <i data-lucide="${metric.icon}" class="w-6 h-6"></i>
                </div>
            </div>
            <div class="metric-value" id="${metric.label.replace(/\s+/g, '')}">${metric.value}</div>
            <div class="text-gray-400 text-sm mt-2">${metric.label}</div>
        </div>
    `).join('');
    
    lucide.createIcons();
    animateMetrics(analysis);
}

// Animate Metrics
function animateMetrics(analysis) {
    const metrics = [
        { id: 'TotalVMs', value: analysis.summary.totalVMs },
        { id: 'CriticalEOL', value: analysis.summary.criticalEOL }
    ];
    
    metrics.forEach(metric => {
        const element = document.getElementById(metric.id);
        if (element) {
            let current = 0;
            const increment = metric.value / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= metric.value) {
                    element.textContent = metric.value;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 20);
        }
    });
}

// Risk Table
function renderRiskTable(analysis) {
    const container = document.getElementById('riskTable');
    const servers = analysis.summary.criticalServers.slice(0, 10);
    
    container.innerHTML = `
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="border-b border-gray-700">
                        <th class="text-left py-3 px-4">Priority</th>
                        <th class="text-left py-3 px-4">VM Name</th>
                        <th class="text-left py-3 px-4">OS</th>
                        <th class="text-left py-3 px-4">Status</th>
                        <th class="text-left py-3 px-4">EOL Date</th>
                        <th class="text-left py-3 px-4">Strategy</th>
                    </tr>
                </thead>
                <tbody>
                    ${servers.map(server => `
                        <tr class="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                            <td class="py-3 px-4">
                                <span class="badge ${server.priority === 'Critical' ? 'danger' : 'warning'}">
                                    ${server.priority}
                                </span>
                            </td>
                            <td class="py-3 px-4 font-mono text-sm">${server.name}</td>
                            <td class="py-3 px-4">${server.os}</td>
                            <td class="py-3 px-4">
                                <span class="badge ${server.osStatus === 'EOL' ? 'danger' : 'warning'}">
                                    ${server.osStatus}
                                </span>
                            </td>
                            <td class="py-3 px-4">${server.eol}</td>
                            <td class="py-3 px-4">
                                <span class="badge">${server.strategy}</span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Save/Load Assessments
function saveAssessment(analysis) {
    const assessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    assessments.unshift({
        id: Date.now(),
        timestamp: analysis.timestamp,
        summary: analysis.summary,
        costs: analysis.costs,
        funding: analysis.funding
    });
    localStorage.setItem('assessments', JSON.stringify(assessments.slice(0, 10)));
}

function loadAssessments() {
    allAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
    displayAssessmentsList();
}

function displayAssessmentsList() {
    const container = document.getElementById('assessmentsList');
    
    if (allAssessments.length === 0) {
        container.innerHTML = `
            <div class="glass-card p-12 text-center">
                <i data-lucide="folder-open" class="w-24 h-24 mx-auto mb-4 text-gray-600"></i>
                <h3 class="text-2xl font-bold mb-2">No Assessments Yet</h3>
                <p class="text-gray-400 mb-6">Start your first assessment to see results here</p>
                <button onclick="showView('upload')" class="btn-primary">
                    <span>Create Assessment</span>
                </button>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    container.innerHTML = allAssessments.map(assessment => `
        <div class="glass-card p-6 hover:bg-opacity-20 transition-all cursor-pointer">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-xl font-bold mb-2">Assessment - ${new Date(assessment.timestamp).toLocaleDateString()}</h3>
                    <div class="flex items-center space-x-4 text-sm text-gray-400">
                        <span>${assessment.summary.totalVMs} VMs</span>
                        <span>•</span>
                        <span>${assessment.summary.criticalEOL} Critical</span>
                        <span>•</span>
                        <span>${assessment.funding.coverage}% Funding</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="btn-primary">
                        <span>View Details</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// UI Helpers
function showLoadingIndicator() {
    document.getElementById('loadingIndicator').classList.remove('hidden');
}

function hideLoadingIndicator() {
    document.getElementById('loadingIndicator').classList.add('hidden');
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="flex items-center space-x-3">
            <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5"></i>
            <span>${message}</span>
        </div>
    `;
    container.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}