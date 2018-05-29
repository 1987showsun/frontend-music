import $ from 'jquery';

export default function(){
  $(function(){
    const mainBanner = slide.initial({
      "class" : "#mainBanner",
      "controls" : {
        "switch" : false
      },
      "auto"  : {
        "switch" : false,
        "seelp"  : 3000,
        "speed"  : 500
      }
    });
    const viceBanner = slide.initial({
      "class" : ".viceBanner",
      "controls" : {
        "switch" : false
      },
      "auto"  : {
        "switch" : false,
        "seelp"  : 3000,
        "speed"  : 500
      }
    })
  })

  const slide = {
    nowSetNumber  : [],
    statusArray   : [],

    initial : function(status){
      const initialState = status;
      slide.statusArray.push(initialState);
      if($(initialState.class).length!=0){
        slide.addWrap(initialState);
        slide.copyContent(initialState);
        slide.liReset(initialState);
        slide.setReset(initialState);
        slide.touch(initialState);
        slide.resizeAction(initialState);
      }
    },

    resizeAction : function(initialState){
      reset()
      $(window).resize(function(e) {
        reset()
      });

      function reset(){
        var $this   = $('.sliderAction');
        for( var i=0 ; i < slide.nowSetNumber.length ; i++ ){
          var _inW = $this.find('>.in').width();
          $this.eq(i).find('.move>ul>li').css({ width : _inW })
          $this.eq(i).find('.wrap>.move').css({ left : -slide.nowSetNumber[i]*_inW });
        }
      }
    },

    addWrap : function(initialState){
      var $this = $(initialState.class);
      $this.find('>.in>').wrap('<div class="wrap"><div class="move"></div></div>');
    },

    copyContent : function(initialState){
      var $this           = $(initialState.class);
      var liContentClone  = [];
      $this.find('ul>li').attr('data-reactid','');
      $this.find('ul>li>').attr('data-reactid','');
      for(var i=0 ; i<2 ; i++){
        liContentClone.push($this.find('ul>li').clone());
      }
      $this.find('.wrap>.move>ul>').last().after(liContentClone);
    },

    liReset : function(initialState){
      var $this = $(initialState.class);
    },

    setReset(initialState){
      var $this     = $(initialState.class);
      var moveBlock = $this.find('.wrap>.move');
      var ulBlock   = moveBlock.find('>ul');
      var liBlock   = ulBlock.find('>li');
      var totalLi   = liBlock.length;
      var liBlockWidth = liBlock.width();
      if( totalLi!=0 ){
        slide.nowSetNumber.push(totalLi/3);
      }else{
        slide.nowSetNumber.push(0);
      }

      moveBlock.css({
        left : (-(totalLi/3)*liBlockWidth)
      })
    },

    touch(initialState){
      var $this     = $(initialState.class);
      var touchSwitch       = false,
          $workBlock        ,
          startX            = 0,
          moveX             = 0,
          endX              = 0,
          moveRange         = 0,
          startNumber       = 0,
          sumSetNumber      = 0,
          nowSetNumber      = 0,
          stepStatus        = 0,
          maxLength         = 0,
          $thisIndex        = 0,
          workBlockLeftCss  = 0;

      //$this.off().on({
      $('.sliderAction').off().on({
        mousedown : function(e) {
          $workBlock        = $(this);
          $thisIndex        = $workBlock.index();
          touchSwitch       = true;
          moveRange         = $workBlock.find('.wrap').width();
          startNumber       = $workBlock.find('.move>ul>li').length/3;
          maxLength         = ($workBlock.find('.move>ul>li').length/3)*2;
          workBlockLeftCss  = parseInt($workBlock.find('.move').css('left'));

          e.preventDefault();

          $('body').off().on({
            mousedown : function(e){
              startX = e.pageX;
            },

            mousemove : function(e){
              if( touchSwitch ){
                moveX = startX - e.pageX;
                endX  = workBlockLeftCss-moveX;
                $workBlock.find('.move').css('left',endX);
                e.preventDefault();
              }
            },

            mouseup : function(e) {
              touchSwitch  = false;
              stepStatus   = new rangeCheck(moveX,moveRange,sumSetNumber,startNumber);
              sumSetNumber = stepStatus.sumSetNumber;
              new animateAction($workBlock,moveRange,nowSetNumber,sumSetNumber,startNumber,$thisIndex);
              $('body').off()
            }
          })
        },

        mouseup : function(){
          touchSwitch  = false;
        }
      })
    }
  }

  const animateAction = ($workBlock,moveRange,nowSetNumber,sumSetNumber,startNumber,$thisIndex) => {

    slide.nowSetNumber[$thisIndex] = sumSetNumber+startNumber;

    $workBlock.find('.move').animate({
      left : -(moveRange*slide.nowSetNumber[$thisIndex])
    }, 500,function(){
      if( sumSetNumber>=startNumber ){
        $(this).css({
          left : -(moveRange*(slide.nowSetNumber[$thisIndex]-startNumber))
        })
      }else if( sumSetNumber<0 ){
        $(this).css({
          left : -(moveRange*(slide.nowSetNumber[$thisIndex]+startNumber))
        })
      }
    })
  }

  const rangeCheck = (moveX,moveRange,sumSetNumber,startNumber) =>{
    if( Math.abs(moveX)>=moveRange/2 ){
      if(moveX>0){
        if(sumSetNumber>=startNumber){
          sumSetNumber = 0;
        }
        sumSetNumber++;
      }else{
        if(sumSetNumber<0){
          sumSetNumber = startNumber;
        }
        sumSetNumber--;
      }
    }
    return {sumSetNumber:sumSetNumber}
  }
}
