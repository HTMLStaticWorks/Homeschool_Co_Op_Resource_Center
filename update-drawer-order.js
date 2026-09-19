const fs = require('fs');
const path = require('path');

const dir = 'd:\\September websites\\Homeschool Co-Op & Resource Center';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the specific block of mobile-nav-actions
    const targetBlock = `<div class="mobile-nav-actions" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 250px;">
            <a href="login.html" class="btn btn-primary" style="width: 100%; justify-content: center; margin-bottom: 1rem;">Parent Login</a>
            <div class="flex gap-6 justify-center">`;
            
    const newBlock = `<div class="mobile-nav-actions" style="display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 250px;">
            <div class="flex gap-6 justify-center" style="margin-bottom: 1rem;">`;
            
    const buttonEndBlock = `                </button>
            </div>
        </div>`;
        
    const newButtonEndBlock = `                </button>
            </div>
            <a href="login.html" class="btn btn-primary" style="width: 100%; justify-content: center;">Parent Login</a>
        </div>`;

    if (content.includes(targetBlock)) {
        content = content.replace(targetBlock, newBlock);
        content = content.replace(buttonEndBlock, newButtonEndBlock);
        fs.writeFileSync(filePath, content);
    }
});
console.log('Mobile nav actions updated.');
