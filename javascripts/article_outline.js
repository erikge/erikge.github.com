$(document).ready(function(){
                  
    function initHeading(){
     
//     var my_h1s = $('.entry-title');
//     if(my_h1s.length > 0) {
//     var my_h1 = my_h1s[0];
//     my_h1.id = 'toc';
//     }
     
    /*
     h2
        curr_index
        items[]
            name
            id
            h3
                curr_index
                items[]
                    name
                    id
                    h4
                        curr_index
                        items[]
                            name
                            id
     */
    var h2 = {};
    h2.curr_index = 0;
    h2.items = [];
    var titles =$('.entry-content h2, .entry-content h3, .entry-content h4');
                  for (var i = 0; i<titles.length;i++) {
                  var element = titles[i];
                  var hn = null;
                  var hnitem = {};

                    if (element.tagName.toLowerCase() == 'h2') {
                    hn = h2;
                  hnitem.h3 = {};
                  hnitem.h3.curr_index = 0;
                  hnitem.h3.items = [];
                    } else if (element.tagName.toLowerCase() == 'h3') {
                    hn = h2.items[h2.curr_index-1].h3;
                  hnitem.h4 = {};
                  hnitem.h4.curr_index = 0;
                  hnitem.h4.items = [];
                    } else if (element.tagName.toLowerCase() == 'h4') {
                    hn = h2.items[h2.curr_index-1].h3.items[h2.items[h2.curr_index-1].h3.curr_index-1].h4;
                  hnitem.h5 = {};
                  hnitem.h5.curr_index = 0;
                  hnitem.h5.items = [];
                    }
                  if(hn) {
                  hn.curr_index++;
                  hnitem.name = $(element).text();
                  hnitem.id = 'toc_'+i;
                  hn.items.push(hnitem);
                  }
                  
                  element.id = 'toc_' + i;
                  }
    return {h2:h2};
    }

    function genTmpl(){
//    var h1txt = $('h1').text();
//    var tmpl = '<ul><li class="h1"><a href="#toc">' + h1txt + '</a></li>';
    var tmpl = '<ul>';

    var heading = initHeading();
    var h2 = heading.h2;
                  
                  for(var i=0;i<h2.curr_index;i++){
                  var h2item = h2.items[i];
                  tmpl += '<li  class="h2"><a href="#'+h2item.id+'">&bull; '+h2item.name+'</a></li>';
                  
                  if(h2item.h3){
                  for(var j=0;j<h2item.h3.curr_index;j++){
                  var h3item = h2item.h3.items[j];
                  tmpl += '<li class="h3"><a href="#'+h3item.id+'">&bull; '+h3item.name+'</a></li>';
                  
                  if(h3item.h4){
                  for(var k=0;k<h3item.h4.curr_index;k++){
                  var h4item = h3item.h4.items[k];
                  tmpl += '<li class="h4"><a href="#'+h4item.id+'">&bull; '+h4item.name+'</a></li>';
                  }
                  }
                  }
                  }
                  }
                  
    tmpl += '</ul>';

    return tmpl;
    }

    function genIndex(){
    var tmpl = genTmpl();
//    var indexCon = '<div id="menuIndex" class="category" ></div>';

//    $('#content').append(indexCon);
//    document.write(indexCon);

    $('#menuIndex')
     .append($(tmpl));
    }


    genIndex();

});
