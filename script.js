function generateCommand() {
    let command = 'ghauri';

    // 目标选项
    const url = document.getElementById('url').value;
    const bulkfile = document.getElementById('bulkfile').value;
    const requestfile = document.getElementById('requestfile').value;

    if (url) command += ` -u "${url}"`;
    if (bulkfile) command += ` -m "${bulkfile}"`;
    if (requestfile) command += ` -r "${requestfile}"`;
    // 注入选项
    const testparam = document.getElementById('testparam').value;
    const dbms = document.getElementById('dbms').value;
    const prefix = document.getElementById('prefix').value;
    const suffix = document.getElementById('suffix').value;
    const safeCharValue = document.getElementById('safe-chars').value;

    if (testparam) command += ` -p "${testparam}"`;
    if (dbms) command += ` --dbms="${dbms}"`;
    if (prefix) command += ` --prefix="${prefix}"`;
    if (suffix) command += ` --suffix="${suffix}"`;
    if (safeCharValue) command += ` --safe-char="${safeCharValue}"`;

    // 请求选项
    const data = document.getElementById('data').value;
    const cookie = document.getElementById('cookie').value;
    const agent = document.getElementById('agent').value;
    const headers = document.getElementById('headers').value;
    const timeoutValue = document.getElementById('timeout').value;
    const delayValue = document.getElementById('delay').value;
    const retriesValue = document.getElementById('retries').value;
    const proxy = document.getElementById('proxy').value;
    const ignoreCodeValue = document.getElementById('ignore-code').value;

    if (data) command += ` --data="${data}"`;
    if (cookie) command += ` --cookie="${cookie}"`;
    if (agent) command += ` --user-agent="${agent}"`;
    if (headers) command += ` --headers="${headers}"`;
    if (timeoutValue) command += ` --timeout=${timeoutValue}`;
    if (delayValue) command += ` --delay=${delayValue}`;
    if (retriesValue) command += ` --retries=${retriesValue}`;
    if (proxy) command += ` --proxy="${proxy}"`;
    if (ignoreCodeValue) command += ` --ignore-code=${ignoreCodeValue}`;

    // 检测选项
    const level = document.getElementById('level').value;
    const verbosity = document.getElementById('verbosity').value;

    command += ` --level=${level} -v ${verbosity}`;

    // 注入技术
    let techniques = '';
    ['b', 'e', 's', 't'].forEach(tech => {
        if (document.getElementById(`tech-${tech}`).checked) {
            techniques += tech.toUpperCase();
        }
    });
    if (techniques) command += ` --technique=${techniques}`;

    // 枚举选项
    const enumOptions = [
        'banner', 'current-user', 'current-db', 'hostname',
        'dbs', 'tables', 'columns', 'dump', 'count'
    ];
    enumOptions.forEach(opt => {
        if (document.getElementById(opt).checked) {
            command += ` --${opt}`;
        }
    });
    const D = document.getElementById('D').value;
    const T = document.getElementById('T').value;
    const C = document.getElementById('C').value;
    if (D) command += ` -D "${D}"`;
    if (C) command += ` -C "${C}"`;
    if (T) command += ` -T "${T}"`;

    // 高级选项
    const advancedOptions = ['confirm', 'skip-urlencode', 'batch'];
    advancedOptions.forEach(opt => {
        if (document.getElementById(opt).checked) {
            command += ` --${opt}`;
        }
    });

    const threads = document.getElementById('threads').value;
    if (threads) command += ` --threads=${threads}`;

    document.getElementById('output').textContent = command;
}


function copyCommand() {
    const output = document.getElementById('output');
    navigator.clipboard.writeText(output.textContent)
        .then(() => {
            const btn = document.querySelector('.copy-btn');
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = 'Copy Command', 2000);
        })
        .catch(err => console.error('Failed to copy:', err));
}