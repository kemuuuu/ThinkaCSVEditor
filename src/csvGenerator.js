class CsvGenerator {

  constructor(json) {
    this._json = json;
    this._header = [];
    this._body = [];
  }

  generate() {
    this._json.map((cur, i, arr) => {
      const line = [];
      Object.keys(cur).map(key => {
        // 処理中のJSONに_headerが持たないキーがあれば、最後尾に加える
        if(this._header.indexOf(key) == -1) this._header.push(key);
        // csv行の作成
        line[this._header.indexOf(key)] = cur[key];
      });
      // undefinedは空のStringに置き換える
      const filled = line.map(e => {
        if (!e) return String('');
        return e;
      });
      this._body.push(filled);
    });

    // 全行の処理が完了したらヘッダの列数を確認し、ボディの不足分を埋める
    this._body = this._body.map((line) => {
      const diff = this._header.length - line.length;
      if (diff > 0) {
        const fil = new Array(diff).fill(String(''));
        return line.concat(fil).join();
      }
      return line.join();
    });

    const csv = this._header.join() + '\n' + this._body.join('\n');
    return csv;
  }
}

module.exports = CsvGenerator;