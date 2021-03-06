/**
 * 操作面板，吃碰杠胡
 * @author chenkai
 * @date 2016/7/11
 * 
 * @author huanglong
 * @data 2017/04/12 chongxie
 */
class SelectActUI extends eui.Component{
    private eatBtn:SelectActBtn;
    private pengBtn:SelectActBtn;
    private gangBtn:SelectActBtn;
    private huBtn:SelectActBtn;
    private passBtn:SelectActBtn;
	private btnList = {};
    public panelWidth = 600; //面板宽度
    private itemWidth = 150;  //按钮宽度
	public bAnGang:boolean = false;  //用于记录暗杠,因为暗杠按钮没有
	private bInitRes:boolean = false;

	private showBtnList: Array<any>;
    
	public constructor() {
    	super();
		this.skinName = "SelectActUISkin";
	}
	
	public childrenCreated(){
        this.btnList[ACT_state.Act_Pass] = this.passBtn;
        this.btnList[ACT_state.Act_Peng] = this.pengBtn;
        this.btnList[ACT_state.Act_Chi] = this.eatBtn;
        this.btnList[ACT_state.Act_Gang] = this.gangBtn;
		this.btnList[ACT_state.Act_AnGang] = this.gangBtn;
        this.btnList[ACT_state.Act_Hu] = this.huBtn;

		this.touchEnabled = false;
        
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch ,this);
	}

	private initRes(){
		if(this.bInitRes == false){
			this.bInitRes = true;
			this.passBtn.setNewActSkin(ACT_act.Act_Pass);
			this.eatBtn.setNewActSkin(ACT_act.Act_Chi);
			this.pengBtn.setNewActSkin(ACT_act.Act_Peng);
			this.gangBtn.setNewActSkin(ACT_act.Act_Gang);
			this.huBtn.setNewActSkin(ACT_act.Act_Hu);
		}
	}
	
	//点击按钮，传递相应动作
	private onTouch(e:egret.TouchEvent){
    	  if(e.target instanceof SelectActBtn){
        	  for(var key in this.btnList){
            	     if(this.btnList[key] == e.target){
						//  if(this.bAnGang)key=ACT_state.Act_AnGang.toString();
                	     this.dispatchEventWith("sendActEvent", false, parseInt(key));
                	     break;
            	     }
        	  }
    	  }
	}
	
	/**
	 * 根据可行操作，显示操作面板
	 * @param actList 动作列表Act_state (碰、杠、胡等)
	 */ 
	public updateInfo(actList){
		this.initRes();
		var len = actList.length;
		this.bAnGang = false;
		this.showBtnList = [];
    	for(var i=len-1;i>=0;i--){
			var act = actList[i];
			var btn = this.btnList[act];
			if(btn == null){
				console.error("缺少动作操作按钮:",act);
				continue;
			}
			if(act ==ACT_state.Act_AnGang){  //因为没有暗杠的img，所以用杠的按钮，这里用bAngGang标志位表示明暗杠
				this.bAnGang = true;
			}
			this.showBtnList.push(btn);
    	}

		for(var key in this.btnList) {
			this.btnList[key].visible = false;
		}
		for(var i = 0;i < this.showBtnList.length;i ++) {
			this.showBtnList[i].visible = true;
			this.showBtnList[i].playAnim();
		}

    	//按钮居中显示
    	len = this.showBtnList.length;
        var startX: number = this.panelWidth/2 - len*this.itemWidth/2;
    	for(var i=0;i<len;i++){
			var child = this.showBtnList[i];
            child.x = startX + this.itemWidth*i;
    	}		
	}

	public show() {
		this.visible = true;
	}

	public hide(){
		for(var key in this.btnList){
			this.btnList[key].stopAnim();
		}

		this.visible = false;
	}
}
