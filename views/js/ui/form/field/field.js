/**
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
 * Copyright (c) 2015 (original work) Open Assessment Technologies SA ;
 */

define([
    'jquery',
    'lodash',
    'i18n',
    'tpl!ui/form/field/tpl/checkbox_list',
    'tpl!ui/form/field/tpl/hidden',
    'tpl!ui/form/field/tpl/password',
    'tpl!ui/form/field/tpl/password_confirm',
    'tpl!ui/form/field/tpl/select',
    'tpl!ui/form/field/tpl/text'
], function (
    $,
    _,
    __,
    checkboxListTpl,
    hiddenTpl,
    passwordTpl,
    passwordConfirmTpl,
    selectTpl,
    textTpl
) {
    'use strict';


    /**
     * Default namespace/class
     * @type {String}
     */
    var _ns = 'ui-form-field';


    /**
     * Default properties for ui/form/field
     * @type {Object}
     */
    var _defaults = {
        container : '.' + _ns,
        object : {
            input : {
                name : 'input',
                rdfs : '',
                value : ''
            },
            label : 'Label',
            required : false
        }
    };


    /**
     * Requisite properties for ui/form/field
     * @type {Object}
     */
    var _requisites = [
        'form',
        'object.input.name',
        'object.type'
    ];


    /**
     * Default templates
     * @type {Object}
     */
    var _templates = {
        checkbox_list : checkboxListTpl,
        default : textTpl,
        hidden : hiddenTpl,
        password : passwordTpl,
        password_confirm : passwordConfirmTpl,
        select : selectTpl,
        text : textTpl
    };


    /**
     * Defines a ui/form/field object
     * @type {Object}
     */
    var field = {

        /**
         * Container property
         * @type {HTMLElement}
         */
        container : null,


        /**
         * Element property
         * @type {HTMLElement}
         */
        element : null,


        /**
         * Errors property
         * @type {Array}
         */
        errors : [],


        /**
         * Form property
         * @type {HTMLElement}
         */
        form : null,


        /**
         * Options property
         * @type {Object}
         */
        options : {},


        /**
         * Validators property
         * @type {Array}
         */
        validators : [],


        /**
         * Initializes the ui/form/field
         * @param {Object} options
         * @param {String|HTMLElement|jQuery} options.form
         * @param {Array|Function} [validators]
         * @returns {field}
         */
        init : function init(options, validators) {
            // Check for required parameters without defaults
            // if (!_.has(options, _requisites)) {
            //     // TODO: How to handle if form doesn't exist?
            //     throw Error('Missing required parameter');
            // }

            // Set options
            _.merge(this.options, _defaults, options);

            // Set template
            this.template = _templates[this.options.object.type] || _templates.default;

            // Set form
            this.form = $(this.options.form).get(0);

            // Set fields' container
            this.container = $(this.options.container).get(0);

            // Set validations
            this.validators = Array.isArray(validators) ? validators :
                _.isFunction(validators) ? [validators] : [];

            return this;
        },


        /**
         * Renders ui/form/field
         */
        render : function render() {
            if (this.element) {
                this.remove();
            }

            this.element = this.template(this.options.object);

            return this;
        },


        /**
         * Attach ui/form/field to ui/form
         * @param {jQuery|HTMLElement|String} [to]
         */
        attachTo : function attach(to) {
            if (!this.element) {
                this.render();
            }

            if (!this.form) {
                // TODO: Should I add container div to form if doesn't exist
                return false;
            }

            if (to) {
                $(this.element)
                .appendTo(
                    $(to || this.container, this.form)
                );
            } else {
                $(this.element)
                .insertBefore('.ui-form-toolbar', this.form);
            }

            return this;
        },


        /**
         * Disable ui/form/field
         */
        disable : function disable() {
            if (this.element) {
                $(this.element).prop('disabled', function(i, v) {
                    return !v;
                });
            }

            return this;
        },


        /**
         * Remove ui/form/field from ui/form
         */
        remove : function remove() {
            if (this.element) {
                $(this.element).remove();
            }

            return this;
        }
    };


    /**
     * Creates a new ui/form/field instance
     * @param {Object} options
     * @returns {field}
     */
    var fieldFactory = function fieldFactory(options) {
        var f = _.cloneDeep(field);
        return f.init(options);
    };


    return fieldFactory;
});
