# Swagger\Client\DocumentsApi

All URIs are relative to *https://localhost/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**callList**](DocumentsApi.md#callList) | **GET** /documents | 
[**create**](DocumentsApi.md#create) | **POST** /documents | 
[**createBatch**](DocumentsApi.md#createBatch) | **POST** /documents/batch | 
[**edit**](DocumentsApi.md#edit) | **PUT** /documents/{documentId} | 
[**find**](DocumentsApi.md#find) | **GET** /documents/{documentId} | 
[**remove**](DocumentsApi.md#remove) | **DELETE** /documents/{documentId} | 


# **callList**
> \Swagger\Client\Model\Documents callList($limit, $order)



### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new Swagger\Client\Api\DocumentsApi();
$limit = 56; // int | 
$order = "order_example"; // string | 

try {
    $result = $api_instance->callList($limit, $order);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DocumentsApi->callList: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **int**|  | [optional]
 **order** | **string**|  | [optional]

### Return type

[**\Swagger\Client\Model\Documents**](../Model/Documents.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/xml, application/json

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **create**
> int create($body)



### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new Swagger\Client\Api\DocumentsApi();
$body = new \Swagger\Client\Model\Document(); // \Swagger\Client\Model\Document | 

try {
    $result = $api_instance->create($body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DocumentsApi->create: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**\Swagger\Client\Model\Document**](../Model/Document.md)|  | [optional]

### Return type

**int**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/xml, application/json
 - **Accept**: text/plain

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **createBatch**
> createBatch($body)



### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new Swagger\Client\Api\DocumentsApi();
$body = new \Swagger\Client\Model\Documents(); // \Swagger\Client\Model\Documents | 

try {
    $api_instance->createBatch($body);
} catch (Exception $e) {
    echo 'Exception when calling DocumentsApi->createBatch: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**\Swagger\Client\Model\Documents**](../Model/Documents.md)|  | [optional]

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/xml, application/json
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **edit**
> edit($document_id, $body)



### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new Swagger\Client\Api\DocumentsApi();
$document_id = 789; // int | 
$body = new \Swagger\Client\Model\Document(); // \Swagger\Client\Model\Document | 

try {
    $api_instance->edit($document_id, $body);
} catch (Exception $e) {
    echo 'Exception when calling DocumentsApi->edit: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **document_id** | **int**|  |
 **body** | [**\Swagger\Client\Model\Document**](../Model/Document.md)|  | [optional]

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/xml, application/json
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **find**
> \Swagger\Client\Model\Document find($document_id)



### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new Swagger\Client\Api\DocumentsApi();
$document_id = 789; // int | 

try {
    $result = $api_instance->find($document_id);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DocumentsApi->find: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **document_id** | **int**|  |

### Return type

[**\Swagger\Client\Model\Document**](../Model/Document.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/xml, application/json

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

# **remove**
> remove($document_id)



### Example
```php
<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new Swagger\Client\Api\DocumentsApi();
$document_id = 789; // int | 

try {
    $api_instance->remove($document_id);
} catch (Exception $e) {
    echo 'Exception when calling DocumentsApi->remove: ', $e->getMessage(), PHP_EOL;
}
?>
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **document_id** | **int**|  |

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../../README.md#documentation-for-api-endpoints) [[Back to Model list]](../../README.md#documentation-for-models) [[Back to README]](../../README.md)

