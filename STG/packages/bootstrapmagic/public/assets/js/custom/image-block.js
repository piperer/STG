(function(){
    var s = document.createElement("script");
    s.src = "http://www.youtube.com/player_api"; /* Load Player API*/
    var before = document.getElementsByTagName("script")[0];
    before.parentNode.insertBefore(s, before);
})();


var player;
function floaded(id,url){
    player = new YT.Player(id, {
        videoId: url,
        events:
        {
            'onStateChange': function (event)
            {
                if (event.data === YT.PlayerState.PLAYING){jQuery('.flexslider').flexslider("pause");}
                else if (event.data === YT.PlayerState.PAUSED){jQuery('.flexslider').flexslider("play"); }
                else if (event.data === YT.PlayerState.BUFFERING){jQuery('.flexslider').flexslider("pause");}
                else if(event.data === YT.PlayerState.ENDED){jQuery('.flexslider').flexslider("play");}
                else if(event.data === YT.PlayerState.CUED) {jQuery('.flexslider').flexslider("pause"); }
            }
        }
    });
}

function addNewSlide(divId)
{
    var $divObj = $('#cbp-spmenu-s2 #'+divId);
    var blockId = divId.split('_')[1];
    var slide_count = ($divObj.siblings().length+1);
    var newElement = $divObj
        .clone()
        .html(function(i, oldHTML) {
            closeAllSlideSettings()
            return oldHTML
                .replace(/\[0\]/g,'['+slide_count+']' )
                .replace(/_0/g,'_'+slide_count )
                .replace('Slide 1', 'Slide '+(slide_count+1))
                ;
        })
        .appendTo('#cbp-spmenu-s2 .slides')
        .attr('id',divId.replace('0',slide_count));
    $(newElement).find('textarea').val('');
    newElement.find('img').attr('src','/uploads/default.jpeg');
    newElement.find('img').attr('title')
    newElement.find('h3').trigger('click');
    newElement.find('.slide_actions').append('<a href="javascript:;" onclick="removeSlide(\'slide_'+blockId+'_'+slide_count+'\')"><i class="icon-trash"></i> Remove</a>');
    newElement.find('input').val('');
}

function removeSlide(divId)
{
    $('#'+divId).remove();
}


/**
 * @todo Clean up
 * Featured Media Script
 *
 */


var field_dialog_form_list_link_galleryHasMedias_media = function(event) {
    initialize_popup_galleryHasMedias_media();

    event.preventDefault();
    event.stopPropagation();

    Admin.log('[galleryHasMedias_media|field_dialog_form_list_link] handle link click in a list');

    var element = jQuery(this).parents('#field_dialog_galleryHasMedias_media .sonata-ba-list-field');


    // the user does not click on a row column
    if (element.length == 0) {
        // make a recursive call (ie: reset the filter)
        jQuery.ajax({
            type: 'GET',
            url: jQuery(this).attr('href'),
            dataType: 'html',
            success: function(html) {
                Admin.log('[galleryHasMedias_media|field_dialog_form_list_link] callback success, attach valid js event');

                field_dialog_content_galleryHasMedias_media.html(html);
                field_dialog_form_list_handle_action_galleryHasMedias_media();
            }
        });

        return;
    }

    jQuery('#'+blockField).val(element.attr('objectId'));
    if(!$(this).children(0).attr('src'))
    {
        imgPreview.attr('src',$(this).parent().find('img').attr('src'));
    }
    else
    {
        imgPreview.attr('src',$(this).children(0).attr('src'));
    }
    jQuery('#galleryHasMedias_media').trigger('change');

    field_dialog_galleryHasMedias_media.modal('hide');
}

// this function handle action on the modal list when inside a selected list
var field_dialog_form_list_handle_action_galleryHasMedias_media  =  function() {

    Admin.log('[galleryHasMedias_media|field_dialog_form_list_handle_action] attaching valid js event');

    Admin.add_filters(field_dialog_galleryHasMedias_media);

    // capture the submit event to make an ajax call, ie : POST data to the
    // related create admin
    jQuery('a', field_dialog_galleryHasMedias_media).on('click', field_dialog_form_list_link_galleryHasMedias_media);
    jQuery('form', field_dialog_galleryHasMedias_media).on('submit', function(event) {
        event.preventDefault();

        var form = jQuery(this);

        Admin.log('[galleryHasMedias_media|field_dialog_form_list_handle_action] catching submit event, sending ajax request');

        jQuery(form).ajaxSubmit({
            type: form.attr('method'),
            url: form.attr('action'),
            dataType: 'html',
            data: {_xml_http_request: true},
            success: function(html) {

                Admin.log('[galleryHasMedias_media|field_dialog_form_list_handle_action] form submit success, restoring event');

                field_dialog_content_galleryHasMedias_media.html(html);
                field_dialog_form_list_handle_action_galleryHasMedias_media();
            }
        });
    });
}

// handle the list link
var field_dialog_form_list_galleryHasMedias_media = function(event) {

    initialize_popup_galleryHasMedias_media();

    event.preventDefault();
    event.stopPropagation();

    Admin.log('[galleryHasMedias_media|field_dialog_form_list] open the list modal');

    var a = jQuery(this);

    field_dialog_content_galleryHasMedias_media.html('');

    // retrieve the form element from the related admin generator
    jQuery.ajax({
        url: a.attr('href'),
        dataType: 'html',
        success: function(html) {

            Admin.log('[galleryHasMedias_media|field_dialog_form_list] retrieving the list content');

            // populate the popup container
            field_dialog_content_galleryHasMedias_media.html(html);

            field_dialog_title_galleryHasMedias_media.html("Media");

            Admin.shared_setup(field_dialog_galleryHasMedias_media);

            field_dialog_form_list_handle_action_galleryHasMedias_media();

            // open the dialog in modal mode
            field_dialog_galleryHasMedias_media.modal();

            Admin.setup_list_modal(field_dialog_galleryHasMedias_media);
        }
    });
};

var field_dialog_galleryHasMedias_media         = false;
var field_dialog_content_galleryHasMedias_media = false;
var field_dialog_title_galleryHasMedias_media   = false;

function initialize_popup_galleryHasMedias_media() {
    // initialize component
    if (!field_dialog_galleryHasMedias_media) {
        field_dialog_galleryHasMedias_media         = jQuery("#field_dialog_galleryHasMedias_media");
        field_dialog_content_galleryHasMedias_media = jQuery(".modal-body", "#field_dialog_galleryHasMedias_media");
        field_dialog_title_galleryHasMedias_media   = jQuery(".modal-title", "#field_dialog_galleryHasMedias_media");

        // move the dialog as a child of the root element, nested form breaks html ...
        jQuery(document.body).append(field_dialog_galleryHasMedias_media);

        Admin.log('[galleryHasMedias_media|field_dialog] move dialog container as a document child');
    }
}

if (field_dialog_galleryHasMedias_media) {
    Admin.shared_setup(field_dialog_galleryHasMedias_media);
}
// this function initialize the popup
// this can be only done this way has popup can be cascaded
function start_field_dialog_form_list_galleryHasMedias_media(link) {

    link.onclick = null;
    blockid_back = $(link).attr('blockid');
    saveMedia = $(link).data('save-media');
    if(!saveMedia)
    {
        blockField = $(link).data('media-field');
        imgPreview = $('#'+$(link).data('preview-div')+' img');
    }
    initialize_popup_galleryHasMedias_media();

    // add the jQuery event to the a element
    jQuery(link)
        .click(field_dialog_form_list_galleryHasMedias_media)
        .trigger('click')
    ;

    return false;
}


