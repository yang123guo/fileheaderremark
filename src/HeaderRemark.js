/**	 
 * @file: fileheaderremark插件核心处理逻辑类
 * @author: yangguoqiang
 * @param: 
 *     props    {Object}     配置项
 * @return: void
 * @example: new HeaderRemark({...})
 */

import RenderTpl from './RenderTpl';
import moment from "moment";

// 创建头备注类
class HeaderRemark {

    // 传入配置参数
    constructor(props) {
        const {
            vscode,
            ...config
        } = props;
        this.vscode = vscode; // 接受传入的vscode对象
        this.config = config; // 接受传入的config
        this.init(); // 执行方法
    }

    // 执行入口
    init() {
        // 参考：https://code.visualstudio.com/docs/extensionAPI/vscode-api
        const {
            workspace, // 当前工作区的 属性 和 方法 和 钩子函数
            commands,
            editor,
            window,
            Position
        } =  this.vscode;

        const {
            getConfiguration, // 获取配置项  getConfiguration(section?: string, resource?: Uri | null)
            onDidSaveTextDocument, // 当执行保存时触发的钩子函数 onDidSaveTextDocument: Event<TextDocument>
        } = workspace;

        const {
            registerCommand, // 注册指令
            registerTextEditorCommand, // 
        } = commands;

        // 获取用户或者默认配置项
        const {
            customConfig
        } = this.getDefaultConfig(getConfiguration); 

        const str = Object.keys(customConfig).reduce((prev, next) => {
            // {
            //     "file": "fileheaderremark插件核心处理逻辑类",
            //     "author": "yangguoqiang",
            //     "date": "Do not edit",
            //     "editor": "OBKoro1",
            //     "lastTime": "Do not edit",
            //     "tips": "",
            //     "description": ""
            // },
            const val = customConfig[next];
            const valTrans = this.config.variable.includes(next) ? `* @${next}: {${next}}\r\n ` : `* @${next}: ${val}\r\n `;
            prev += valTrans;
            return prev;
        }, '');
        const tpl = this.config.remark.replace(this.config.tag, str);

        // this.config.remark =  '/**\r\n $$*/\r\n'

        // 用户在命令行输入命令时，或者使用快捷键时执行，触发回调，返回为需释放资源实体
        const disposable = registerTextEditorCommand('extension.fileheaderremark', (textEditor, edit, args) => {
            // 获取当前活动窗口
            // const activeTextEditor = window.activeTextEditor;
            // const {
            //     selection
            // } = activeTextEditor;

            // Position两个参数 line(行数), character(第几个字符) 
            const location = new Position(this.config.line, this.config.character);
            // 生成字符串
            const value = new RenderTpl().render();
            edit.insert(location, value);
        })

        return disposable;

        /**
         * 用户保存当前文档时执行
         * 保存时候需要替换最后修改人和修改时间
         * 为了节流，如果最近一次时间和最后时间相差过小，不更新
         */ 
        onDidSaveTextDocument(TextDocument => {

        })
    }

    // 获取默认配置
    getDefaultConfig(getConfiguration) {
        const key = this.config.command || 'fileheaderremark';
        return getConfiguration[key];
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