class CsvGenerator {

  constructor(json) {
    this._json = json;
    this._header = [];
    this._body = [];
  }

  generate() {
    this._json.reduce((acc, cur, i, arr) => {
      const line = [];
      Object.keys(cur).map(key => {
        // 処理中のJSONに_headerが持たないキーがあれば、最後尾に加える
        if(this._header.indexOf(key) == -1) this._header.push(key);
        // csv行の作成
        line[this._header.indexOf(key)] = cur[key];
      });
      const filled = line.map(e => {
        if (!e) return String('');
        return e;
      })
      this._body.push(filled.join());
    });
    const csv = this._header.join() + '\n' + this._body.join('\n');
    return csv;
  }
}

module.exports = CsvGenerator;