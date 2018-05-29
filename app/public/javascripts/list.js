import $ from 'jquery';

export default function(){
  $(function(){
    list.initial();
  });

  const list = {
    initial(){
      let $list           = $('ul.list'),
          _model          = ['Block','Column'],
          _className      = ['model1','model2','model3'],
          _rangeW         = {
            "Block"   : {
              "model1" : [1380,1024,860,600],
              "model2" : [1280,1000,768,600],
              "model3" : [1280,1000,800,600],
            },
            "Column"  : {
              "model1" : [1280,1000,800,600],
              "model2" : [1280,1000,768,600],
              "model3" : [1280,1000,800,600],
              "model4" : [1280,1000,800,600],
            }
          },
          _selectRange    = [],
          _selectAddCalss = 0,
          _listLength     = $list.length,
          _listW          = 0,
          _listClassArray = [];

      test();
      $(window).resize(function(event) {
        test();
      });

      function test(){
        let $list           = $('ul.list'),
            _model          = ['Block','Column'],
            _className      = ['model1','model2','model3'],
            _rangeW         = {
              "Block"   : {
                "model1" : [1380,1024,860,600],
                "model2" : [1280,1000,768,600],
                "model3" : [1280,1000,800,600],
              },
              "Column"  : {
                "model1" : [1280,1000,800,600],
                "model2" : [1280,1000,768,600],
                "model3" : [1280,1000,800,600],
                "model4" : [1280,1000,800,600],
              }
            },
            _selectRange    = [],
            _selectAddCalss = 0,
            _listLength     = $list.length,
            _listW          = 0,
            _listClassArray = [];

        for(var i=0 ; i < _listLength ; i++){
          _listClassArray = $list.eq(i).attr('class').split(' ');
          _listW          = $list.eq(i).width();
          _selectRange    = list.selectRange(_rangeW,_listClassArray);
          _selectAddCalss = list._selectAddCalss(_selectRange,_listW);
          if( _selectRange!=undefined ){
            for( var r=0 ; r <= _selectRange.length ; r++ ){
              $list.eq(i).removeClass('style'+r);
            }
            $list.eq(i).addClass('style'+_selectAddCalss);
          }
        }
      }
    },

    _selectAddCalss(_selectRange,_listW){
      if( _selectRange!=undefined ){
        let _selectRangeLenght  = _selectRange.length,
            _maxRange           = [],
            _minRange           = [],
            _sum                = 0,
            _select             = 0;

        for( var r=0 ; r < _selectRangeLenght ; r++ ){
          _maxRange[_sum] = _selectRange[_sum];
          _minRange[_sum] = _selectRange[_sum+1];
          _sum++;
          if( _selectRange[_sum]==undefined ){
            _minRange[_sum-1] = _selectRange[_sum-1];
          }

          if( _listW>=_maxRange[0] ){
            _select = 0;
          }else if( _listW<_minRange[_selectRangeLenght-1] ){
            _select = _selectRangeLenght;
          }else if( _listW<_maxRange[r] && _listW>=_minRange[r] ){
            _select = r+1;
          }
        }
        return _select;
      }
    },

    selectRange(_rangeW,_listClassArray){
      let type  = {},
          model = [];
      for( var t=0 ; t < Object.keys(_rangeW).length ; t++ ){
        if( _listClassArray.indexOf( Object.keys(_rangeW)[t] )>=0 ){
          type = _rangeW[ Object.keys(_rangeW)[t] ];
          for(var m=0 ; m < Object.keys( type ).length ; m++ ){
            model = type[ Object.keys(type)[m] ];
            if( _listClassArray.indexOf( Object.keys(type)[m] )>=0 ){
              return model;
            }
          }
        }
      }
    }
  }
}
