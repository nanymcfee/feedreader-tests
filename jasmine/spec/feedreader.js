/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {
    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */
    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */

           it('each url is not empty',function(){
             for (var j=0;j<allFeeds.length;j++){
             expect(allFeeds[j].url).toBeDefined();//保证有链接字段
             expect(allFeeds[j].url).not.toBe("");//保证每个链接不是空的
           }
           });



        /* TODO:
         * 编写一个测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
         it('each name is not empty',function(){
           for(var i=0;i<allFeeds.length;i++){
             expect(allFeeds[i].name).toBeDefined();//保证有名字字段
             expect(allFeeds[i].name).not.toBe("");//保证名字字段不是空的
           }
         });
    });


    /* TODO: 写一个叫做 "The menu" 的测试用例 */
    describe('The menu',function(){



        /* TODO:
         * 写一个测试用例保证菜单元素默认是隐藏的。你需要分析 html 和 css
         * 来搞清楚我们是怎么实现隐藏/展示菜单元素的。
         */
         //menu通过添加去除“menu-hidden”类实现隐藏显示
         it('is hidden',function(){
          expect($('body').hasClass('menu-hidden')).toBe(true);

         });

         /* TODO:
          * 写一个测试用例保证当菜单图标被点击的时候菜单会切换可见状态。这个
          * 测试应该包含两个 expectation ： 党点击图标的时候菜单是否显示，
          * 再次点击的时候是否隐藏。
          */
          it('can be displayed and hidden by click',function(){
              $('.menu-icon-link').click();//点击按钮，显示菜单
              expect($('body').hasClass('menu-hidden')).toBe(false);
              $('.menu-icon-link').click();//点击按钮，隐藏菜单
              expect($('body').hasClass('menu-hidden')).toBe(true);




          });
      });
      var originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL=900000;//修改测试时间,由于网络太慢时间过长
    /* TODO: 13. 写一个叫做 "Initial Entries" 的测试用例 */
    describe('Initial Entries',function(){
        /* TODO:
         * 写一个测试保证 loadFeed 函数被调用而且工作正常，即在 .feed 容器元素
         * 里面至少有一个 .entry 的元素。
         *
         * 记住 loadFeed() 函数是异步的所以这个而是应该使用 Jasmine 的 beforeEach
         * 和异步的 done() 函数。
         */
         //set initial state
         var e;
         beforeEach(function(done){
           //originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
          // jasmine.DEFAULT_TIMEOUT_INTERVAL=900000;//修改测试时间,由于网络太慢时间过长

           loadFeed(1,function(){
            //return the num of entries
            e=$('.feed').find('.entry').length;

             done();
           });

         });


         it('load feed is successful',function(){
           console.log(e);

           expect(e).toBeGreaterThan(0);
           //done();
         });
         afterEach(function(){
           jasmine.DEFAULT_TIMEOUT_INTERVAL=originalTimeout;//恢复时间
         });
      });

    /* TODO: 写一个叫做 "New Feed Selection" 的测试用例 */
    jasmine.DEFAULT_TIMEOUT_INTERVAL=2000000;//网速太差，延长默认时间
describe('New Feed Selection',function(){
  var entryOld,entryNew;

  beforeEach(function(done){
    //originalTimeout=jasmine.DEFAULT_TIMEOUT_INTERVAL;
    //jasmine.DEFAULT_TIMEOUT_INTERVAL=900000;//修改测试时间,由于网络太慢时间过长
    entryOld=$('.feed').text();//记录原始的text作比较
    console.log(entryOld);
    loadFeed(0,function(){
      entryNew=$('.feed').text();
      done();
    });


  });
  it('content is changed',function(done){
    expect(entryOld).not.toEqual(entryNew);//比较重新加载后的第一个元素
    done();
  });
  afterEach(function(){
    jasmine.DEFAULT_TIMEOUT_INTERVAL=originalTimeout;//恢复时间默认值
  });
});
  /*  describe('New Feed Selection',function(){
      var entryBefore,entryAfter;


//处理异步函数loadFeed
      beforeEach(function(done){
        entryBefore=$('.feed').html();
        loadFeed(1,function(done){

          entryAfter=$('.feed').html
          done();
        });

      });


       it('value has changed after load new source'.function(done){

           expect(entryBefore).not.toEqual(entryAfter);
           done();
         });

    });
    */

}());
