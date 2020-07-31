$(document).ready(function(){
    $('select').formSelect();
    $('.datepicker').datepicker();
    $('.modal').modal();
  });


$('body').on('click','.ex-goods', function(){
    if(!$(this).hasClass('disabled')){
        var num_goods = $('dt .num', this).text();
        var name_goods = $('dt .name', this).text();
        var pos = $('dd .pos', this).text();
        var kg_goods = $('dd .kg', this).text();
        var str_kg = kg_goods.split('кг');
        var num_kg = str_kg[0];
        var data_color = $(this).attr('data-color');
        var bg_color = $(this).attr('data-colorrgb');
        var legh_block = $('.block-goods_add .row-goods').length;
        var next_block = legh_block + 1;
        $('<div class="row-goods '+data_color+'"><table class="table-goods '+ data_color+'" style="background:'+bg_color+'"><th class="th-num_goods" data-attr="'
        +num_goods+'">'+num_goods+'</th><th>'+name_goods+'</th><th class="th-del"><i class="material-icons dp48 del" data-leght="'+next_block+'" data-attr="'
        +data_color+'">delete</i></th><tr><td class="td_kg" data-kg="'+num_kg+'"> '+ pos +' = '+ kg_goods+
        '</td><td colspan="2"><div class="number"><span class="minus" data-attr="'+data_color+'" data-bg="'+bg_color+'" data-leght="'+next_block+
        '">-</span><input type="text" value="0"/><span class="plus" data-attr="'
        +data_color+'" data-bg="'+bg_color+'" data-leght="'+next_block+'">+</span></div></td></tr></table></div>')
        .appendTo('.block-goods_add');
        $(this).addClass('disabled');
        $('#modal_goods').modal('close');
        if (config.data.datasets.length > 0) {
            config.data.labels.push('');

            config.data.datasets.forEach(function(dataset) {
                dataset.data.push(0);
                dataset.backgroundColor.push('');
            });

            window.myDoughnut.update();
        }
 
    }
});
$('body').on('click','.material-icons.del', function(){
    var delblock = $(this).attr('data-attr');
    var data_j =$(this).attr('data-leght');
    var legh_block = $('.block-goods_add .row-goods').length -1;
    var proc_ost = 0;
    $('.row-goods.'+delblock).remove();
    $('#modal_goods dl[data-color="'+delblock+'"]').removeClass('disabled');
    config.data.labels.splice(data_j, 1); // remove the label first 
    config.data.datasets.forEach(function(dataset) {
 
        dataset.data.splice(data_j, 1);
        dataset.backgroundColor.splice(data_j, 1);
        for(i=1; i<= legh_block; i++){
            proc_ost += dataset.data[i];
            dataset.data[0] = 100 - proc_ost;
        }
        console.log(dataset.data);
    });   
    window.myDoughnut.update();
    $('h5.proc').text(proc_ost+'%');
    var fill_kg = max_kg * proc_ost/100;
            $('.wt .fill').text(fill_kg);
    for(d=0; d<legh_block; d++){
        $('.block-goods_add .minus:eq('+d+')').attr('data-leght',d+1);
        $('.block-goods_add .plus:eq('+d+')').attr('data-leght',d+1);
        $('.block-goods_add .del:eq('+d+')').attr('data-leght',d+1);
    }
});


    $('body').on('click','.minus', function (){
        var legh_block = $('.block-goods_add .row-goods').length;
        var $input = $(this).parent().find('input');
        var circl_color = $(this).attr('data-attr');
        var data_i =$(this).attr('data-leght');
        var kg = $('.row-goods.'+circl_color+' .td_kg').attr('data-kg');
        var circl_name = $('.row-goods.'+circl_color+' .th-num_goods').attr('data-attr');
        var max_kg = $('.block-goods_add').attr('data-maxkg');
  
        var data_color = $(this).attr('data-bg');
        var proc_ost = 0;
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        var quantity = $input.val();
        var proc = kg/max_kg * 100 * quantity;
        if (config.data.datasets.length > 0) {
            config.data.labels[data_i] = circl_name;
           
            config.data.datasets.forEach(function(dataset) {
                dataset.data[data_i] = proc;
                dataset.backgroundColor[data_i] = data_color;
                for(i=1; i<= legh_block; i++){
                    proc_ost += dataset.data[i];
                    dataset.data[0] = 100 - proc_ost;
                }
                
            });
            $('h5.proc').text(proc_ost+'%');
            var fill_kg = max_kg * proc_ost/100;
            $('.wt .fill').text(fill_kg);
            window.myDoughnut.update();
        }
    });
    $('body').on('click','.plus', function () {
        var legh_block = $('.block-goods_add .row-goods').length;
        var $input = $(this).parent().find('input');
        var circl_color = $(this).attr('data-attr');
        var data_i =$(this).attr('data-leght');
        var kg = $('.row-goods.'+circl_color+' .td_kg').attr('data-kg');
        var circl_name = $('.row-goods.'+circl_color+' .th-num_goods').attr('data-attr');
        var max_kg = $('.block-goods_add').attr('data-maxkg');
   
        var data_color = $(this).attr('data-bg');
        var proc_ost = 0;
               
        $input.val(parseInt($input.val()) + 1);        
        $input.change();
        var quantity = $input.val();
        

        var proc = kg/max_kg * 100 * quantity;
        
        if (config.data.datasets.length > 0) {
            config.data.labels[data_i] = circl_name;
           
            config.data.datasets.forEach(function(dataset) {
               
                dataset.data[data_i] = proc;
                dataset.backgroundColor[data_i] = data_color;
                for(i=1; i<= legh_block; i++){
                    proc_ost += dataset.data[i];
                    dataset.data[0] = 100 - proc_ost;
                    
                }

            });

        }
        var fill_kg = max_kg * proc_ost/100;
        $('h5.proc').text(proc_ost+'%');
        $('.wt .fill').text(fill_kg);
        window.myDoughnut.update();
        
    });
$('.create_application').submit(function(){
    $('#modal_ok').modal('open');

});


