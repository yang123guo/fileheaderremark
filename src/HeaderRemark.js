/**	 
 * @file: fileheaderremark插件核心处理逻辑类
 * @author: yangguoqiang
 * @param: 
 *     props    {Object}     配置项
 * @return: void
 * @example: new HeaderRemark({...})
 */

// 创建头备注类
class HeaderRemark {

    // 传入配置参数
    constructor(props) {
        const {vscode} = props;
        this.vscode = vscode; // 接受传过来的vscode对象
        this.init(); // 执行方法
    }

    // 执行入口
    init() {
        // 参考：https://code.visualstudio.com/docs/extensionAPI/vscode-api
        const {
            workspace, // 当前工作区的 属性 和 方法 和 钩子函数
            commands,
            editor,
            window
        } =  this.vscode;

        const {
            getConfiguration, // 获取配置项  getConfiguration(section?: string, resource?: Uri | null)
            onDidSaveTextDocument, // 当执行保存时触发的钩子函数 onDidSaveTextDocument: Event<TextDocument>
        } = workspace;

        const {
            registerCommand, // 注册指令
        } = commands
    }


    init2() {                      //初始化
        var vscode = this.vscode;
        var StatusBarAlignment = vscode.StatusBarAlignment;
        var window = this.vscode.window;
 
        //statusBar，是需要手动释放的
        this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left);
 
        //跟注册事件相配合的数组，事件的注册，也是需要释放的
        var disposable = [];
        //事件在注册的时候，会自动填充一个回调的dispose到数组
        window.onDidChangeTextEditorSelection(this.updateText, this, disposable);
 
        //保存需要释放的资源
        this.disposable = vscode.Disposable.from(disposable);
 
        this.updateText();
        this.statusBar.show();
    }
 
    updateText() {       //现在快凌晨两点，偷个懒早点睡，临时改成字符数量了。
        var window = this.vscode.window;
        this.editor = window.activeTextEditor;
        var content = this.editor.document.getText();
        var len = content.replace(/[\r\n\s]+/g, '').length;
        this.statusBar.text = `啦啦啦...已经敲了${len}个字符了`;
    }
 
    dispose() {  //实现dispose方法
        this.disposable.dispose();
        this.statusBar.dispose();
    }
}

export default HeaderRemark;