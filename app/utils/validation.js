import moment from 'moment';

export default class Validation {
  constructor(data, rules) {
    this.data = data;
    this.rules = rules;
    this.errors = {};
    this.req = '';

    this._rules = {
      alpha_dash: (val) => {
        return (/^[a-zA-Z0-9_\-]+$/).test(val);
      },
      alpha_num: (val) => {
        return (/^[a-zA-Z0-9]+$/).test(val);
      },
      alpha_space: (val) => {
        return (/^[a-z\s]+$/i).test(val);
      },
      date: (val) => {
        return moment(val).isValid();
      },
      email: function (val) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
      },
      'in': (val) => {
        let list, i;

        if (val) {
          list = this.req.split(',');
        }

        if (val && !(val instanceof Array)) {
          let localValue = val;

          for (i = 0; i < list.length; i++) {
            if (typeof list[i] === 'string') {
              localValue = String(val);
            }

            if (localValue === list[i]) {
              return true;
            }
          }

          return false;
        }

        if (val && val instanceof Array) {
          for (i = 0; i < val.length; i++) {
            if (list.indexOf(val[i]) < 0) {
              return false;
            }
          }
        }

        return true;
      },
      integer: (val) => {
        return String(parseInt(val, 10)) === String(val);
      },
      numeric: (val) => {
        let num;

        num = Number(val);

        if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
          return true;
        } else {
          return false;
        }
      },
      required: (val) => {
        let str;

        if (val === undefined || val === null) {
          return false;
        }

        str = String(val).replace(/\s/g, "");

        return str.length > 0 ? true : false;
      },
    };

    this.validate();
  }

  validate() {
    Object.keys(this.data).map((key) => {
      let value = true;

      this.rules[key].map((item) => {
        const rules = item.split(':');
        const rule = rules[0];
        this.req = (rules.length > 1 ? rules[1] : '');

        if (! this.rules[key].includes('required')) {
          value = this.data[key] ? true : false;
        }

        if (value && ! this._rules[rule](this.data[key])) {
          this.errors[key] = true;

          return false;
        }
      });
    });
  }

  errors() {
    return this.errors;
  }
}