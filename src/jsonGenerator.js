class JsonGenerator {

  constructor(data) {
    this._data = data;
    this._flg = false;
    this._json = [];
  }

  generate() {
    // 1行を1要素としたリストを作成
    this._data.split('\n').reduce((acc,line,i) => {
      // 2行目まではヘッダなのでスキップ
      if (i < 2) return;

      // 1行ごとのデータを格納するJSON
      let json_tmp = {}

      // 1セルを1要素としたリストを作成
      const delimitered = line.split(',').map((cell) => cell.replace(/"/g,''));

      // 1セルずつJSONに加えていく
      delimitered.reduce((acc, cur, i, arr) => {
        if (this._flg) {
          this._flg = false;
          return;
        }
        if (cur != '' && cur) {
          // カラム1 ~ 7までは標準項目
          if (i == 0) json_tmp.phone = cur;
          if (i == 1) json_tmp.name = cur;
          if (i == 2) json_tmp.name_kana = cur;
          if (i == 3) json_tmp.address = cur;
          if (i == 4) json_tmp.sex = cur;
          if (i == 5) json_tmp.birthday = cur;
          if (i == 6) json_tmp.status = cur;
          // カラム7以降は自由項目
          if (i > 6) {
            // 奇数列はkey
            if (i%2 !== 0) {
              json_tmp[cur] = arr[i+1];
              this._flg = true;
            }
          }
        }
        // 最後の要素
        if (i === arr.length-1) {
          this._json.push(json_tmp);
        }
      });
    })

    return this._json;
  }
}

module.exports = JsonGenerator;