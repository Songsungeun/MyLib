# MyLib

## Functions

<dl>
<dt><a href="#compareJson">compareJson(originJson, modifiedJson)</a> ⇒ <code>Object</code></dt>
<dd><p>get the modified data from target Json</p>
</dd>
<dt><a href="#jsonArrSort">jsonArrSort(jsonArr, targetKey)</a> ⇒ <code>Array</code></dt>
<dd><p>func: sort by targetKey value</p>
</dd>
<dt><a href="#jsonSortByKey">jsonSortByKey(jsonData)</a> ⇒ <code>Object</code></dt>
<dd><p>only 1depth key sort</p>
</dd>
<dt><a href="#jsonSortByKeyToDeep">jsonSortByKeyToDeep(jsonData)</a> ⇒ <code>Object</code></dt>
<dd><p>all of Ndepth key sort</p>
</dd>
</dl>

<a name="compareJson"></a>

## compareJson(originJson, modifiedJson) ⇒ <code>Object</code>
get the modified data from target Json

**Kind**: global function
**Returns**: <code>Object</code> - - modified data object(json Type) or false(if. same json)
**Author:**: Song sungeun,

| Param | Type | Description |
| --- | --- | --- |
| originJson | <code>Object</code> |  |
| modifiedJson | <code>Object</code> | comparison Json |

<a name="jsonArrSort"></a>

## jsonArrSort(jsonArr, targetKey) ⇒ <code>Array</code>
func: sort by targetKey value

**Kind**: global function
**Returns**: <code>Array</code> - jsonArray
**Author**: Song sungeun

| Param | Type |
| --- | --- |
| jsonArr | <code>Array</code> |
| targetKey | <code>String</code> |

<a name="jsonSortByKey"></a>

## jsonSortByKey(jsonData) ⇒ <code>Object</code>
only 1depth key sort

**Kind**: global function
**Returns**: <code>Object</code> - jsonData sorted by key
**Author**: Song sungeun

| Param | Type |
| --- | --- |
| jsonData | <code>Object</code> |

<a name="jsonSortByKeyToDeep"></a>

## jsonSortByKeyToDeep(jsonData) ⇒ <code>Object</code>
all of Ndepth key sort

**Kind**: global function
**Returns**: <code>Object</code> - jsonData deeply sorted by key
**Author**: Song sungeun

| Param | Type |
| --- | --- |
| jsonData | <code>Object</code> |
