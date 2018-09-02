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
        const {
            
        } =  this.vscode;
    }
}

export default HeaderRemark;