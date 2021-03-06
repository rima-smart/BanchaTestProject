/*!
 *
 * Bancha Project : Seamlessly integrates CakePHP with ExtJS and Sencha Touch (http://banchaproject.org)
 * Copyright 2011-2012 StudioQ OG
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha
 * @copyright     Copyright 2011-2012 StudioQ OG
 * @link          http://banchaproject.org Bancha Project
 * @since         Bancha v 0.9.3
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v PRECOMPILER_ADD_RELEASE_VERSION
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:false */
/*global Ext, Bancha */

Ext.onReady(function() {
    
    // load dependencies
    Ext.require([
        'Ext.data.*',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ]);

    // init Bancha
    Bancha.init();
    
    // panel
    var panel = null;
    
    // write console helper
    var log = function(msg) {
            var date = new Date();
            date = (date.getHours()<10 ? ' '+date.getHours() : date.getHours())+":"+
                   (date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes());
            panel.getTargetEl().insertHtml(
                'beforeEnd',
                date + ': ' + msg + '<br>'
            );
        };

    // create a input textfield
    var textfield = Ext.create('Ext.form.field.Text', {
        title: "First Name:",
        allowBlank: false
    });
    
    // create the button
    var button = Ext.create('Ext.button.Button', {
        text : 'Get Greetings',
        handler: function() {
            if(textfield.isValid()) {
                // send the request to the server
                var unixTimestamp = (Date.now()/1000).toString();
                Bancha.getStub('Hello').getGreeting(unixTimestamp, textfield.getValue(),function(result) {
                    // this is the result callback
                    if(result.success) {
                        log(result.data);
                    } else {    
                        log("The server does not want to talk to you.");
                    }
                });
            } else {
                Ext.Msg.show({
                    animationTarget: button.getEl(),
                    title: "Name not defined",
                    msg: "Please write your name before asking for a greeting.",
                    icon: Ext.window.MessageBox.ERROR,
                    buttons: Ext.Msg.OK,
                    fn: function() {
                        textfield.focus();
                    }
                });
            }
        } //eo handler
    }); //eo button
    
    
    // create the container and render
    panel = Ext.create('Ext.Panel', {
        frame: true,
        width: 650,
        height: 300,
        renderTo: 'log',
        title: 'Log',
        html: '',
        cls: 'log-text',
        fbar: ['Enter your firstname here:',textfield, button]
    });

}); //eo onReady

// eof
