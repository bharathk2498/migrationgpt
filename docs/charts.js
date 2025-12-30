// Chart configurations and rendering
// STATIC MODE: Cost Analysis chart animations disabled

let osChart, strategyChart, costChart;

function renderCharts(analysis) {
    renderOSChart(analysis);
    render7RChart(analysis);
    renderCostChart(analysis);
}

// OS Lifecycle Chart
function renderOSChart(analysis) {
    const ctx = document.getElementById('osChart').getContext('2d');
    
    if (osChart) {
        osChart.destroy();
    }
    
    const data = {
        labels: ['Active', 'Extended Support', 'End of Life'],
        datasets: [{
            data: [
                analysis.summary.activeOS || 0,
                analysis.summary.extendedSupport || 0,
                analysis.summary.criticalEOL || 0
            ],
            backgroundColor: [
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)'
            ],
            borderColor: [
                'rgba(16, 185, 129, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(239, 68, 68, 1)'
            ],
            borderWidth: 2
        }]
    };
    
    osChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        font: {
                            size: 14,
                            family: 'Inter'
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 7R Strategy Chart
function render7RChart(analysis) {
    const ctx = document.getElementById('strategyChart').getContext('2d');
    
    if (strategyChart) {
        strategyChart.destroy();
    }
    
    const strategies = ['Rehost', 'Replatform', 'Repurchase', 'Refactor', 'Retire', 'Retain', 'Relocate'];
    const strategyData = strategies.map(s => analysis.summary.strategyBreakdown[s] || 0);
    
    const data = {
        labels: strategies,
        datasets: [{
            label: 'Number of VMs',
            data: strategyData,
            backgroundColor: [
                'rgba(14, 165, 233, 0.8)',
                'rgba(139, 92, 246, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(107, 114, 128, 0.8)',
                'rgba(99, 102, 241, 0.8)'
            ],
            borderColor: [
                'rgba(14, 165, 233, 1)',
                'rgba(139, 92, 246, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(107, 114, 128, 1)',
                'rgba(99, 102, 241, 1)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };
    
    strategyChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart',
                delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default') {
                        delay = context.dataIndex * 100;
                    }
                    return delay;
                }
            }
        }
    });
}

// Cost Analysis Chart - STATIC MODE
function renderCostChart(analysis) {
    const ctx = document.getElementById('costChart').getContext('2d');
    
    if (costChart) {
        costChart.destroy();
    }
    
    const data = {
        labels: ['Current On-Prem', 'AWS On-Demand', 'AWS BYOL', 'Net Year 1 (with funding)'],
        datasets: [{
            label: 'Monthly Cost ($)',
            data: [
                analysis.costs.current,
                analysis.costs.awsOnDemand,
                analysis.costs.awsBYOL,
                Math.max(0, analysis.funding.netYear1)
            ],
            backgroundColor: [
                'rgba(107, 114, 128, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(16, 185, 129, 0.8)'
            ],
            borderColor: [
                'rgba(107, 114, 128, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(16, 185, 129, 1)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    };
    
    costChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `$${context.parsed.x.toLocaleString()}/month`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            family: 'Inter'
                        },
                        callback: function(value) {
                            return '$' + (value / 1000).toFixed(0) + 'K';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                }
            },
            animation: false  // STATIC MODE - NO ANIMATION
        }
    });
}

// Export to Excel
function exportToExcel() {
    if (!currentAssessment) {
        showToast('No assessment data to export', 'error');
        return;
    }
    
    showLoadingIndicator();
    
    setTimeout(() => {
        const wb = XLSX.utils.book_new();
        
        // Summary Sheet
        const summaryData = [
            ['Migration Assessment Summary'],
            ['Generated', new Date().toLocaleString()],
            [],
            ['Key Metrics'],
            ['Total VMs', currentAssessment.summary.totalVMs],
            ['Active OS', currentAssessment.summary.activeOS],
            ['Extended Support', currentAssessment.summary.extendedSupport],
            ['End of Life', currentAssessment.summary.criticalEOL],
            ['Cloud Ready %', currentAssessment.summary.cloudReady + '%'],
            [],
            ['Cost Analysis (Monthly)'],
            ['Current On-Prem', '$' + currentAssessment.costs.current.toLocaleString()],
            ['AWS On-Demand', '$' + currentAssessment.costs.awsOnDemand.toLocaleString()],
            ['AWS BYOL', '$' + currentAssessment.costs.awsBYOL.toLocaleString()],
            ['Savings', '$' + currentAssessment.costs.savings.toLocaleString()],
            ['Savings %', currentAssessment.costs.savingsPercent + '%'],
            [],
            ['AWS Funding'],
            ['ISV Funding', '$' + currentAssessment.funding.isvFunding.toLocaleString()],
            ['Assess Credit', '$' + currentAssessment.funding.assessCredit.toLocaleString()],
            ['Mobilize Credit', '$' + currentAssessment.funding.mobilizeCredit.toLocaleString()],
            ['Migrate Credit', '$' + currentAssessment.funding.migrateCredit.toLocaleString()],
            ['Total Funding', '$' + currentAssessment.funding.totalFunding.toLocaleString()],
            ['Coverage %', currentAssessment.funding.coverage + '%'],
            ['Net Year 1 Cost', '$' + currentAssessment.funding.netYear1.toLocaleString()]
        ];
        
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
        XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
        
        // VM Details Sheet
        const vmData = [
            ['VM Name', 'OS', 'Status', 'EOL Date', 'CPU', 'Memory', 'Storage', 'Environment', 'Strategy', 'Confidence']
        ];
        
        currentAssessment.vms.forEach(vm => {
            vmData.push([
                vm.name,
                vm.os,
                vm.osStatus,
                vm.eol,
                vm.cpu,
                vm.memory,
                vm.storage,
                vm.environment,
                vm.strategy,
                vm.confidence + '%'
            ]);
        });
        
        const vmSheet = XLSX.utils.aoa_to_sheet(vmData);
        XLSX.utils.book_append_sheet(wb, vmSheet, 'VM Details');
        
        // Download
        XLSX.writeFile(wb, `Migration_Assessment_${new Date().toISOString().split('T')[0]}.xlsx`);
        
        hideLoadingIndicator();
        showToast('Excel exported successfully!', 'success');
    }, 500);
}

// Generate PowerPoint
function generatePowerPoint() {
    if (!currentAssessment) {
        showToast('No assessment data to export', 'error');
        return;
    }
    
    showLoadingIndicator();
    
    setTimeout(() => {
        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_16x9';
        pptx.author = 'MigrationGPT Enterprise';
        pptx.company = 'Cloud Migration Platform';
        pptx.title = 'Cloud Migration Assessment';
        
        // Slide 1: Title
        const slide1 = pptx.addSlide();
        slide1.background = { fill: '0f172a' };
        slide1.addText('Cloud Migration Assessment', {
            x: 0.5, y: 2.5, w: 9, h: 1.5,
            fontSize: 44, bold: true, color: 'FFFFFF',
            align: 'center'
        });
        slide1.addText('Enterprise Infrastructure Analysis', {
            x: 0.5, y: 4.0, w: 9, h: 0.5,
            fontSize: 24, color: '0ea5e9',
            align: 'center'
        });
        slide1.addText(new Date().toLocaleDateString(), {
            x: 0.5, y: 5.0, w: 9, h: 0.3,
            fontSize: 14, color: '9ca3af',
            align: 'center'
        });
        
        // Slide 2: Executive Summary
        const slide2 = pptx.addSlide();
        slide2.background = { fill: '0f172a' };
        slide2.addText('Executive Summary', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 32, bold: true, color: 'FFFFFF'
        });
        
        const summaryRows = [
            ['Metric', 'Value'],
            ['Total Virtual Machines', currentAssessment.summary.totalVMs.toString()],
            ['Active Operating Systems', currentAssessment.summary.activeOS.toString()],
            ['Extended Support OS', currentAssessment.summary.extendedSupport.toString()],
            ['End of Life OS', currentAssessment.summary.criticalEOL.toString()],
            ['Cloud Ready Percentage', currentAssessment.summary.cloudReady + '%'],
            ['Estimated Monthly Savings', '$' + currentAssessment.costs.savings.toLocaleString()],
            ['AWS Funding Coverage', currentAssessment.funding.coverage + '%']
        ];
        
        slide2.addTable(summaryRows, {
            x: 0.5, y: 1.5, w: 9, h: 3.5,
            fontSize: 14,
            color: 'FFFFFF',
            fill: { color: '1e293b' },
            border: { pt: 1, color: '334155' }
        });
        
        // Slide 3: Cost Analysis
        const slide3 = pptx.addSlide();
        slide3.background = { fill: '0f172a' };
        slide3.addText('Cost Analysis', {
            x: 0.5, y: 0.5, w: 9, h: 0.6,
            fontSize: 32, bold: true, color: 'FFFFFF'
        });
        
        const costRows = [
            ['Cost Category', 'Monthly Cost'],
            ['Current On-Premises', '$' + currentAssessment.costs.current.toLocaleString()],
            ['AWS On-Demand', '$' + currentAssessment.costs.awsOnDemand.toLocaleString()],
            ['AWS BYOL', '$' + currentAssessment.costs.awsBYOL.toLocaleString()],
            ['Monthly Savings', '$' + currentAssessment.costs.savings.toLocaleString()],
            ['Savings Percentage', currentAssessment.costs.savingsPercent + '%']
        ];
        
        slide3.addTable(costRows, {
            x: 0.5, y: 1.5, w: 9, h: 3.0,
            fontSize: 14,
            color: 'FFFFFF',
            fill: { color: '1e293b' },
            border: { pt: 1, color: '334155' }
        });
        
        // Save
        pptx.writeFile({ fileName: `Migration_Assessment_${new Date().toISOString().split('T')[0]}.pptx` });
        
        hideLoadingIndicator();
        showToast('PowerPoint generated successfully!', 'success');
    }, 500);
}

// Sample Data
function loadSampleData() {
    showLoadingIndicator();
    
    setTimeout(() => {
        const oses = [
            'Windows Server 2022', 'Windows Server 2019', 'Windows Server 2016',
            'Windows Server 2012 R2', 'Windows Server 2008 R2',
            'RHEL 9', 'RHEL 8', 'RHEL 7', 'CentOS 7', 'Ubuntu 22.04', 'Ubuntu 20.04'
        ];
        
        const datacenters = ['DC-US-EAST', 'DC-US-WEST', 'DC-EU-WEST', 'DC-APAC'];
        const environments = ['Production', 'Development', 'Testing', 'Staging'];
        
        const sampleData = [];
        for (let i = 1; i <= 300; i++) {
            sampleData.push({
                'VM Name': `VM-${i.toString().padStart(4, '0')}`,
                'OS': oses[Math.floor(Math.random() * oses.length)],
                'CPU': [2, 4, 8, 16][Math.floor(Math.random() * 4)],
                'Memory': [4, 8, 16, 32, 64][Math.floor(Math.random() * 5)],
                'Storage': [100, 250, 500, 1000][Math.floor(Math.random() * 4)],
                'Datacenter': datacenters[Math.floor(Math.random() * datacenters.length)],
                'Environment': environments[Math.floor(Math.random() * environments.length)],
                'Database': Math.random() > 0.7 ? ['SQL Server', 'PostgreSQL', 'MySQL'][Math.floor(Math.random() * 3)] : 'None'
            });
        }
        
        const analysis = analyzeInventory(sampleData);
        currentAssessment = analysis;
        displayResults(analysis);
        saveAssessment(analysis);
        showView('dashboard');
        hideLoadingIndicator();
        showToast('Sample data loaded successfully!', 'success');
    }, 1000);
}

// Template Generation
function generateRVToolsTemplate() {
    const data = [
        ['VM Name', 'OS', 'CPU', 'Memory', 'Storage', 'Datacenter', 'Environment', 'Database'],
        ['Example-VM-001', 'Windows Server 2022', '4', '16', '250', 'DC-US-EAST', 'Production', 'SQL Server'],
        ['Example-VM-002', 'RHEL 8', '8', '32', '500', 'DC-US-WEST', 'Development', 'None']
    ];
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'VMs');
    XLSX.writeFile(wb, 'RVTools_Template.xlsx');
    showToast('RVTools template downloaded!', 'success');
}

function generateVMwareTemplate() {
    const data = [
        ['VM Name', 'Operating System', 'vCPU', 'RAM', 'Disk', 'DC', 'Env', 'DB'],
        ['Example-VM-001', 'Windows Server 2019', '2', '8', '100', 'DC-US-EAST', 'Production', 'None'],
        ['Example-VM-002', 'Ubuntu 20.04', '4', '16', '250', 'DC-US-WEST', 'Testing', 'PostgreSQL']
    ];
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'VMware Export');
    XLSX.writeFile(wb, 'VMware_Template.xlsx');
    showToast('VMware template downloaded!', 'success');
}

function generateManualTemplate() {
    const data = [
        ['VM Name', 'OS', 'CPU', 'Memory', 'Storage', 'Datacenter', 'Environment', 'Database'],
        ['', '', '', '', '', '', '', '']
    ];
    
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Manual Entry');
    XLSX.writeFile(wb, 'Manual_Template.xlsx');
    showToast('Manual template downloaded!', 'success');
}