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
            editor
        } =  this.vscode;

        const {
            getConfiguration, // 获取配置项  getConfiguration(section?: string, resource?: Uri | null)
            onDidSaveTextDocument, // 当执行保存时触发的钩子函数 onDidSaveTextDocument: Event<TextDocument>
        } = workspace;

        const {
            registerCommand, // 注册指令
        } = commands
    }
}

export default HeaderRemark;