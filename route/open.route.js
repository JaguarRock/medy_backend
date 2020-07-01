const request = require('request');
const router = require('express').Router();
const parser = require('xml2json');

router.get('/', function(req, res, next) {
  var service_key = '';
  var url = 'http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem';
  var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + service_key;
  //queryParams += '&' + encodeURIComponent('item_name') + '=' + encodeURIComponent('푸라콩정');
  
  request({
    url: url + queryParams,
    method: 'GET'
  }, function (error, response, xml) {
    const json = JSON.parse(parser.toJson(xml));
    const item = json.response.body.items.item;
    //console.log(item)
    res.send(item);
  })
})

router.get('/:ITEM_NAME', function(req, res, next) {
  var service_key = '';
  var url = 'http://apis.data.go.kr/1471057/MdcinPrductPrmisnInfoService/getMdcinPrductItem';
  var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + service_key;
  queryParams += '&' + encodeURIComponent('item_name') + '=' + encodeURIComponent(req.params.ITEM_NAME);
  //console.log(req);

  request({
    url: url + queryParams,
    method: 'GET'
  },function (error, response, xml) {
    const json = JSON.parse(parser.toJson(xml));
    const item = json.response.body.items.item;
    res.send(item);
  })
})

module.exports = router;