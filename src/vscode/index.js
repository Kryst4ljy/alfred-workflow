import alfy from 'alfy';
import path from 'path';
import glob from 'fast-glob';

const input = alfy.input || '';
const searchPath = process.env.HOME + '/Desktop/**';
const searchOption = {
  onlyDirectories: true,
  deep: 2,
  globstar: true,
};

// 先查询缓存中是否存在文件列表
const cacheFullPath = alfy.cache.get('fullPath');
let parseFullPath = cacheFullPath ? JSON.parse(cacheFullPath) : null;

if (!parseFullPath) {
  // 第一次查询出所有的文件
  parseFullPath = (glob.sync(searchPath, searchOption) || []).map((item) => {
    const name = path.basename(item);
    return { title: name, subtitle: item, uid: item, arg: item, autocomplete: name };
  });

  alfy.cache.set('fullPath', JSON.stringify(parseFullPath));
}

const filtered = parseFullPath.filter((item) => item?.title?.includes(input));

alfy.output(filtered);
