// miniprogram/qa/qa.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:"start",//默认开始页面
        quiz:"",//初始化题目对象
        quizNum:0,//题号默认0
        quizList:[],//初始化题目对象列表
        score:0,//分数默认0
        styleArr:["option","option","option","option"],//每题四个选项的样式
        isanswer:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//每题是否已回答标记
        rangeList:[],//排行榜对象列表
        isanswerNum:0,//已回答过的题目数目
        answershower:['A','B','C','D']//答案选项展示列表
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:  function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    selectDb(dbname){
        return wx.cloud.database().collection(dbname)//选择数据库
    },

    async getQs(dbname){
        let db = this.selectDb(dbname)
        let randomNum = parseInt(Math.random()*15980)        
        //skip()设置偏移数量
        //limit()限制数量
        let result = await db.skip(randomNum).limit(20).get()
        return result
    },//从数据库获取题目
    async setQs(){
        let result = await this.getQs("questions")
        this.setData({
            quizList:result.data,
            quiz:result.data[0]
        })//将获取到的题目赋值到quiz
    },//获取题目并设定题目
    startgame(){
        this.setQs();
        let quizNum = 0;
        let isanswer = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let arr = ['option','option','option','option','option'];
        let score = 0;
        let isanswerNum = 0;
        this.setData({
            page:"gaming",
            quizNum:quizNum,
            isanswer:isanswer,
            styleArr:arr,
            score:score,
            isanswerNum:isanswerNum
        })//每次开始游戏重置相关数据
    },//开始游戏
    chooseas(event){
        if(this.data.isanswer[this.data.quizNum]){
            return;//如果已答过该题则点击选项不作出反应
        }
        let num = event.currentTarget.dataset.num
        if(num == this.data.quiz.answer){
            let score = this.data.score+5//答对加5分
            let arr = this.data.styleArr//正确选项变色 改变class
            let isanswerNum = this.data.isanswerNum+1//已答题目数量+1
            let arr2 = this.data.isanswer
            arr2[this.data.quizNum] = 1//该题已答过
            arr[num-1]="option right"
            this.setData({
                score:score,
                styleArr:arr,
                isanswer:arr2,
                isanswerNum:isanswerNum
            })
            
            setTimeout(() => {
                let arr = this.data.styleArr
                arr[num-1]="option"
                this.setData({
                    styleArr:arr,
                })
                if(this.data.isanswerNum<20){//如果没有20题没有答满就进行下一步判断
                    if(this.data.quizNum<19){//如果20题没答满且不是第20(列表下表19)题
                        // let arr = this.data.styleArr
                        // arr[num-1]="option"
                        // arr[this.data.quiz.answer-1]="option"
                        let quizNum = this.data.quizNum+1//题号加1，为进入下一题准备
                        this.setData({
                            quizNum:quizNum,
                            
                        })
                        this.setData({
                        quiz:this.data.quizList[this.data.quizNum],//进入下一题
                        // styleArr:arr,
                        })
                    }else{
                        return//如果20题没打答满,但是题号已到达20题(下标19题)
                    }
                }else{
 
                    this.endgame()
                }
            }, 1500)
        }else{
            let arr = this.data.styleArr;
            let arr2 = this.data.isanswer;
            let isanswerNum = this.data.isanswerNum+1//已答题目数量+1
            arr2[this.data.quizNum] = 1
            arr[num-1]="option  wrong"//错误选项变色 改变class
            arr[this.data.quiz.answer-1]="option right"//正确选项变色 改变class
            this.setData({                
                styleArr:arr,
                isanswer:arr2,
                isanswerNum:isanswerNum
            })
            setTimeout(() => {
                let arr = this.data.styleArr
                arr[num-1]="option"
                arr[this.data.quiz.answer-1]="option"
                this.setData({
                    styleArr:arr,
                })
                if(this.data.isanswerNum<20){//如果没有20题没有答满就进行下一步判断
                    if(this.data.quizNum<19){//如果20题没答满且不是第20(列表下表19)题
                        // let arr = this.data.styleArr
                        // arr[num-1]="option"
                        // arr[this.data.quiz.answer-1]="option"
                        let quizNum = this.data.quizNum+1//题号加1，为进入下一题准备
                        this.setData({
                            quizNum:quizNum,
                            
                        })
                        this.setData({
                        quiz:this.data.quizList[this.data.quizNum],//进入下一题
                        // styleArr:arr,
                        })
                    }else{
                        return//如果20题没打答满,但是题号已到达20题(下标19题)
                    }
                        
                }else{
                        this.endgame() 
                }
            }, 1500)//延迟1秒进入下一题
        };
            // setTimeout(() => {
            //     if(this.data.quizNum<10){
            //         let arr = this.data.styleArr;
            //         arr[num-1]="option";
            //         arr[this.data.quiz.answer-1]="option";
            //         this.setData({
            //         quiz:this.data.quizList[this.data.quizNum],//进入下一题
            //         styleArr:arr,
            //         isanswer:false
            //         });
            //     }else{
            //         this.endgame();
            //     }
                
            //     console.log(this.data.quizNum)
            // }, 1500);//延迟1秒进入下一题
    },
    previousQuiz(){
        if(this.data.quizNum<1){
            return
        }else{        
            let quizNum = this.data.quizNum-1
            this.setData({
                quizNum:quizNum,
            })
            this.setData({
                quiz:this.data.quizList[this.data.quizNum]
            })}
    },
    nextQuiz(){
        if(this.data.quizNum>18){
            return
        }else{
            let quizNum = this.data.quizNum+1
        this.setData({
            quizNum:quizNum,
        })
        this.setData({
            quiz:this.data.quizList[this.data.quizNum]
        })
        }
        
    },

    endgame(){
        this.uploadRange()//结束时上传成绩并获取排行
        this.setData({
            page:"end"
        })
    },
    uploadRange(){
        let that = this
        if(that.data.score==0){
            that.getRange();  
        }else{
            wx.getUserInfo({
                success(res){
                    let data = res.userInfo
                    data.score = that.data.score
                    let db = that.selectDb("quizRange").add({
                        data:data,
                        success(res){
                            that.getRange()
                        }
                    })
                }
              })
            }
        //上传成绩并获取排行
    },
    async getRange(){
        let db = this.selectDb("quizRange")
        let result = await db.aggregate().sort({score:-1}).limit(10).end()
        this.setData({
            rangeList:result.list
        })  
    }//获取排行前10
    
})