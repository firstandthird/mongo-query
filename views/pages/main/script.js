/* eslint-env browser */

import Domodule from 'domodule';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import CodeMirror from 'codemirror';
import Ajax from 'bequest';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
const textArea = document.getElementById('query'); // eslint-disable-line no-unused-vars


class QueryModule extends Domodule {
  constructor(el) {
    super(el);
    this.setupDbs();
    this.editor = this.setupEditor();
  }

  setupDbs() {
    const dbSelect = this.els.databases;
    Ajax.request('/api/databases', 'GET', null, (err, resp) => {
      if (err) {
        alert(err); // eslint-disable-line no-alert
      }

      if (resp.statusCode !== 200) {
        alert('Bad Request Getting Databases'); // eslint-disable-line no-alert
      }

      if (resp.data.length > 0) {
        resp.data.forEach((db) => {
          dbSelect.insertAdjacentHTML('beforeend', `<option value='${db}'>${db}</option>`);
        });
      }
    });
  }

  getCollections(el) {
    const db = el.value;
    const collSelect = this.els.collections;
    collSelect.innerHTML = '<option>Collection</option>';
    collSelect.disabled = true;
    Ajax.request(`/api/databases/${db}/collections`, 'GET', null, (err, resp) => {
      if (err) {
        alert(err); // eslint-disable-line no-alert
      }

      if (resp.statusCode !== 200) {
        alert('Error loading collections'); // eslint-disable-line no-alert
      }

      if (resp.data) {
        resp.data.forEach((coll) => {
          collSelect.insertAdjacentHTML('beforeend', `<option value='${coll}'>${coll}</option>`);
        });
        collSelect.disabled = false;
      }
    });
  }

  setupEditor() {
    const editorEl = this.els.editor;
    const editor = CodeMirror.fromTextArea(editorEl, {
      mode: {
        name: 'javascript',
        json: true
      },
      theme: 'cobalt',
      tabSize: 2,
      indentWithTabs: false,
      matchBrackets: true,
      cursorScrollMargin: 10
    });

    return editor;
  }

  submitQuery() {
    const data = {
      query: this.editor.getValue(),
      db: this.els.databases.value,
      collection: this.els.collections.value
    };

    Ajax.request('/api/query', 'POST', data, (err, resp) => {
      if (err) {
        alert(err); // eslint-disable-line no-alert
      }

      if (resp.data) {
        const respData = JSON.stringify(resp.data, null, 2);
        const html = Prism.highlight(respData, Prism.languages.json);
        this.els.response.innerHTML = `<pre class="language-json">${html}</pre>`;
      }
    });
  }

  doQuery(el, event) {
    event.preventDefault();
    this.submitQuery();
  }
}

Domodule.register('QueryModule', QueryModule);
