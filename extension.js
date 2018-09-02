// 引入HeaderRemark类 es6方式
import HeaderRemark from './src/HeaderRemark';
// 引入vscode的API require方式
const vscode = require('vscode');

// 在插件被激活的时候，这个方法会被调用 
function activate(context) {

    // 执行 HeaderRemark 这个类
    const headerRemark = new HeaderRemark(vscode);
    // 需要释放的资源都在这里依次push到这个数组里面
    context.subscriptions.push(headerRemark);
}

// 对外暴露激活钩子函数
exports.activate = activate;



// 当插件失效的时候调用此方法 
function deactivate() {
}
exports.deactivate = deactivate;