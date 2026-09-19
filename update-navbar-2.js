const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Homeschool Co-Op & Resource Center';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldRtlSvg1 = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"></path><path d="M21 7H3"></path><path d="M7 21l-4-4 4-4"></path><path d="M3 17h18"></path></svg>';
const newRtlSvg1 = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>';

const oldRtlSvg2 = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"></path><path d="M21 7H3"></path><path d="M7 21l-4-4 4-4"></path><path d="M3 17h18"></path></svg>';
const newRtlSvg2 = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>';

const oldRtlSvg3 = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4-4 4"></path><path d="M21 7H3"></path><path d="M7 21l-4-4 4-4"></path><path d="M3 17h18"></path></svg>';
const newRtlSvg3 = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>';

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the ugly double arrows with the sleek ones
    content = content.replace(new RegExp(oldRtlSvg1.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), newRtlSvg1);
    content = content.replace(new RegExp(oldRtlSvg2.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), newRtlSvg2);
    content = content.replace(new RegExp(oldRtlSvg3.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), newRtlSvg3);

    // Also replace the chevron-down to a cleaner size if not already
    content = content.replace(/<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"><\/polyline><\/svg>/g, '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');

    // Remove display flex from nav-item-dropdown to ensure perfect alignment
    // (We'll do this in CSS, but let's check the span)
    
    fs.writeFileSync(filePath, content);
});

console.log('Icons updated successfully.');
