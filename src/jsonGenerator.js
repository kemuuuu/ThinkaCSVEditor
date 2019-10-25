class JsonGenerator {

  constructor(data) {
    this._data = data;
    this._flg = false;
    this._json = [];
  }

  generate() {
    // 1行を1要素としたリストを作成
    this._data.split('\n').map((line,lineNumber) => {

      // 1行目はヘッダーなのでスキップ
      if (lineNumber < 1) return;

      // 1行ごとのデータを格納するJSON
      let json_tmp = {}

      // 1セルを1要素としたリストを作成
      const delimitered = line.split(',').map((cell) => cell.replace(/"/g,''));

      // 1セルずつJSONに加えていく
      delimitered.map((cur, i, arr) => {
        // フラグがtrueであれば、すでに現在の列はjsonに加えられているのでスキップ
        if (this._flg) {
          this._flg = false;
          return;
        }
        if (cur != '' && cur) {
          // カラム1 ~ 7までは標準項目
          if (i == 0) json_tmp['電話番号'] = cur;
          if (i == 1) json_tmp['名前'] = cur;
          if (i == 2) json_tmp['ナマエカナ'] = cur;
          if (i == 3) json_tmp['住所'] = cur;
          if (i == 4) json_tmp['性別']= cur;
          if (i == 5) json_tmp['誕生日'] = cur;
          if (i == 6) json_tmp['顧客状況'] = cur;
          // カラム8以降は自由項目
          if (i >= 7) {
            // 奇数列はkey
            // 次の列をvalueに入れてフラグを立てる
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