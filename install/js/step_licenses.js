/*  
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 * 
 * Copyright (c) 2002-2008 (original work) Public Research Centre Henri Tudor & University of Luxembourg (under the project TAO & TAO2);
 *               2008-2010 (update and modification) Deutsche Institut für Internationale Pädagogische Forschung (under the project TAO-TRANSFER);
 *               2009-2012 (update and modification) Public Research Centre Henri Tudor (under the project TAO-SUSTAIN & TAO-DEV);
 * 
 */
function onLoad(){

        install.onNextable = function(){
		$('#submitForm').removeClass('disabled')
                    .addClass('enabled')
                    .attr('disabled', false);
		$('#submitForm').attr('value', 'Next');
	}
	
	install.onUnnextable = function(){
		$('#submitForm').removeClass('enabled')
                    .addClass('disabled')
                    .attr('disabled', true);
		$('#submitForm').attr('value', 'Next');
	}
	
	$('.tao-input').each(function(){
		// Provide a data getter/setter for API handshake.
		install.getDataGetter(this);
		install.getDataSetter(this);
                
                install.getValidator(this, {dataType: 'regexp', 'pattern': '[0-9]+'});
                install.register(this);
	});

	// Backward management.
	$('#install_seq li a').each(function(){
		$(this).bind('click', onBackward);
	});
    
        $('form').bind('submit', function(){
		if (install.isNextable()){
			install.setTemplate('step_registration_1');
		}
		
		return false;
	});
        
        $(function() {
           $('#dialog-license1-confirm').dialog({
              autoOpen: false,
              resizable: false,
              draggable: false,
              height: 450,
              width: 700,
              modal: true,
              buttons: {
                "button-accept" : {
                    text: "I have read and agree to the Terms and Conditions",
                    id: "license1-button-accept",
                    click: function(){
                        $(this).dialog( "close" );
                    }
                 },
                 "button-refuse" : {
                    text: "Cancel",
                    id: "license1-button-refuse",
                    click: function(){
                        $(this).dialog( "close" );
                    }
                 }
              },
              //show: { effect: "blind", duration: 200 }              
            });
          });
          
          $(function() {
           $('#dialog-license2-confirm').dialog({
              autoOpen: false,
              resizable: false,
              draggable: false,
              height: 450,
              width: 700,
              modal: true,
              buttons: {
                "button-accept" : {
                    text: "I have read and agree to the Terms and Conditions",
                    id: "license2-button-accept",
                    click: function(){
                        $(this).dialog( "close" );
                    }
                 },
                 "button-refuse" : {
                    text: "Cancel",
                    id: "license2-button-refuse",
                    click: function(){
                        $(this).dialog( "close" );
                    }
                 }
              },
            });
          });
        
        $('#readLicense1').click(
           function() {
                $('#dialog-license1-confirm').dialog('open');
                $('#screenShield').css('display','');
           }
        ).focus();

        $('#readLicense2').click(
           function() {
                $('#dialog-license2-confirm').dialog('open');
            }
        );

        $('#license1-button-accept').click(               
            function() { 
                 $('#approval-status-1')
                    .text("You have reviewed and accepted the terms of this license.")
                    .append('<img src="images/valide.png" />');                     
                 $('#readLicense2').focus();
                 
                 $('#gplRead').val('1');
                 install.stateChange();
            }
        );
        $('#license1-button-refuse').click(               
            function() { 
                 $('#approval-status-1')
                    .text("You have not accepted the terms of the license.")
                    .append('&nbsp;<img src="images/failed.png" />');
                 
                 $('#gplRead').val('');
                 install.stateChange();
            }
        );
    
        $('#license2-button-accept').click(               
            function() { 
                $('#approval-status-2')
                   .text("You have reviewed and accepted the terms of this license.")
                   .append('&nbsp;<img src="images/valide.png" />');                     

                $('#trademarkRead').val('1');
                install.stateChange();
                
                $('input#submitForm').focus();
            }
        );
    
        $('#license2-button-refuse').click(               
            function() { 
                 $('#approval-status-2')
                    .text("You have not accepted the terms of the license.")
                    .append('&nbsp;<img src="images/failed.png" />');

                $('#trademarkRead').val('');
                install.stateChange();
            }
        );

        // loading of all licenses and license headers
        $('textarea#readLicense1Header').load('licenses/gnu_gplv2_header.txt');
        $('#dialog-license1-confirm').load('licenses/gnu_gplv2_license.html');     
        //$('#dialog-license1-confirm').load('http://tao.vhost/TAOForgeRegistration.html');//TAOForgeCheckAccount.html');
        $('textarea#readLicense2Header').load('licenses/tao_trademark_header.txt');
        $('#dialog-license2-confirm').load('licenses/tao_trademark.html');
        // scroll to top -- doesn't seem to work -- not required anymore
        //$('.ui-dialog-content').scrollTop( $('#dialog-license1-confirm')[0].scrollHeight );

        $('#abortForm').bind('click', function(event){
                install.setTemplate('step_requirements');
        });
}
