const expect = require('chai').expect,
  {
    HTTP_PROTOCOL,
    SOAP12_PROTOCOL,
    SOAP_PROTOCOL
  } = require('../../lib/Wsdl11Parser'),
  {
    DOC_HAS_NO_SERVICE_MESSAGE,
    DOC_HAS_NO_BINDIGS_MESSAGE,
    DOC_HAS_NO_BINDIGS_OPERATIONS_MESSAGE,
    DOC_HAS_NO_SERVICE_PORT_MESSAGE
  } = require('../../lib/constants/messageConstants'),
  assert = require('chai').assert,
  fs = require('fs'),
  WsdlObject = require('../../lib/WSDLObject').WsdlObject,
  {
    Wsdl20Parser,
    WSDL_NS_URL,
    WSDL_ROOT
  } = require('../../lib/Wsdl20Parser'),
  {
    POST_METHOD
  } = require('../../lib/utils/httpUtils'),
  {
    PARSER_ATRIBUTE_NAME_PLACE_HOLDER,
    getBindings,
    getServices
  } = require('../../lib/WsdlParserCommon'),
  specialCasesWSDLs = 'test/data/specialCases/wsdl2',
  validWSDLs20 = 'test/data/validWSDLs20',
  WSDL_SAMPLE = `<?xml version="1.0" encoding="utf-8" ?>
  <description xmlns="http://www.w3.org/ns/wsdl" 
  targetNamespace="http://greath.example.com/2004/wsdl/resSvc" 
  xmlns:tns="http://greath.example.com/2004/wsdl/resSvc" 
  xmlns:ghns="http://greath.example.com/2004/schemas/resSvc" 
  xmlns:wsoap="http://www.w3.org/ns/wsdl/soap" 
  xmlns:soap="http://www.w3.org/2003/05/soap-envelope" 
  xmlns:wsdlx="http://www.w3.org/ns/wsdl-extensions">
      <documentation>
          This document describes the GreatH Web service. Additional
          application-level requirements for use of this service --
          beyond what WSDL 2.0 is able to describe -- are available
          at http://greath.example.com/2004/reservation-documentation.html
      </documentation>
      <types>
          <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" 
          targetNamespace="http://greath.example.com/2004/schemas/resSvc" 
          xmlns="http://greath.example.com/2004/schemas/resSvc">
              <xs:element name="checkAvailability" type="tCheckAvailability" />
              <xs:complexType name="tCheckAvailability">
                  <xs:sequence>
                      <xs:element name="checkInDate" type="xs:date" />
                      <xs:element name="checkOutDate" type="xs:date" />
                      <xs:element name="roomType" type="xs:string" />
                  </xs:sequence>
              </xs:complexType>
              <xs:element name="checkAvailabilityResponse" type="xs:double" />
              <xs:element name="invalidDataError" type="xs:string" />
          </xs:schema>
      </types>
      <interface name="reservationInterface">
          <fault name="invalidDataFault" element="ghns:invalidDataError" />
          <operation name="opCheckAvailability" pattern="http://www.w3.org/ns/wsdl/in-out" 
          style="http://www.w3.org/ns/wsdl/style/iri" wsdlx:safe="true">
              <input messageLabel="In" element="ghns:checkAvailability" />
              <output messageLabel="Out" element="ghns:checkAvailabilityResponse" />
              <outfault ref="tns:invalidDataFault" messageLabel="Out" />
          </operation>
      </interface>
      <binding name="reservationSOAPBinding" interface="tns:reservationInterface" 
      type="http://www.w3.org/ns/wsdl/soap" wsoap:protocol="http://www.w3.org/2003/05/soap/bindings/HTTP/">
          <fault ref="tns:invalidDataFault" wsoap:code="soap:Sender" />
          <operation ref="tns:opCheckAvailability" wsoap:mep="http://www.w3.org/2003/05/soap/mep/soap-response" />
      </binding>
      <service name="reservationService" interface="tns:reservationInterface">
          <endpoint name="reservationEndpoint" binding="tns:reservationSOAPBinding" 
          address="http://greath.example.com/2004/reservation" />
      </service>
  </description>`,
  WSDL_SAMPLE_AXIS = `<wsdl2:description xmlns:wsdl2="http://www.w3.org/ns/wsdl" 
  xmlns:wsoap="http://www.w3.org/ns/wsdl/soap" 
  xmlns:whttp="http://www.w3.org/ns/wsdl/http" xmlns:ns="http://axis2.org" 
  xmlns:wsaw="http://www.w3.org/2006/05/addressing/wsdl" 
  xmlns:wsdlx="http://www.w3.org/ns/wsdl-extensions" xmlns:tns="http://axis2.org" 
  xmlns:wrpc="http://www.w3.org/ns/wsdl/rpc" 
  xmlns:xs="http://www.w3.org/2001/XMLSchema" 
  xmlns:ns1="http://org.apache.axis2/xsd" targetNamespace="http://axis2.org">
<wsdl2:documentation> Please Type your service description here </wsdl2:documentation>
<wsdl2:types>
    <xs:schema attributeFormDefault="qualified" elementFormDefault="qualified" 
    targetNamespace="http://axis2.org">
        <xs:element name="hi">
            <xs:complexType>
                <xs:sequence />
            </xs:complexType>
        </xs:element>
        <xs:element name="hiResponse">
            <xs:complexType>
                <xs:sequence>
                    <xs:element minOccurs="0" name="return" nillable="true" type="xs:string" />
                </xs:sequence>
            </xs:complexType>
        </xs:element>
    </xs:schema>
</wsdl2:types>
<wsdl2:interface name="ServiceInterface">
    <wsdl2:operation name="hi" 
    style="http://www.w3.org/ns/wsdl/style/rpc http://www.w3.org/ns/wsdl/style/iri 
    http://www.w3.org/ns/wsdl/style/multipart"
     wrpc:signature="return #return " pattern="http://www.w3.org/ns/wsdl/in-out">
        <wsdl2:input element="ns:hi" wsaw:Action="urn:hi" />
        <wsdl2:output element="ns:hiResponse" wsaw:Action="urn:hiResponse" />
    </wsdl2:operation>
</wsdl2:interface>
<wsdl2:binding name="SayHelloSoap11Binding" interface="tns:ServiceInterface" 
type="http://www.w3.org/ns/wsdl/soap" wsoap:version="1.1">
    <wsdl2:operation ref="tns:hi" wsoap:action="urn:hi">
        <wsdl2:input />
        <wsdl2:output />
    </wsdl2:operation>
</wsdl2:binding>
<wsdl2:binding name="SayHelloSoap12Binding" interface="tns:ServiceInterface" 
type="http://www.w3.org/ns/wsdl/soap" wsoap:version="1.2">
    <wsdl2:operation ref="tns:hi" wsoap:action="urn:hi">
        <wsdl2:input />
        <wsdl2:output />
    </wsdl2:operation>
</wsdl2:binding>
<wsdl2:binding name="SayHelloHttpBinding" interface="tns:ServiceInterface" 
whttp:methodDefault="POST" type="http://www.w3.org/ns/wsdl/http">
    <wsdl2:operation ref="tns:hi" whttp:location="hi">
        <wsdl2:input />
        <wsdl2:output />
    </wsdl2:operation>
</wsdl2:binding>
<wsdl2:service name="SayHello" interface="tns:ServiceInterface">
    <wsdl2:endpoint name="SayHelloHttpEndpoint" 
    binding="tns:SayHelloHttpBinding" 
    address="http://192.168.100.75:8080/Axis2-bottom/services/SayHello.SayHelloHttpEndpoint/" />
    <wsdl2:endpoint name="SayHelloHttpSoap11Endpoint" 
    binding="tns:SayHelloSoap11Binding" 
    address="http://192.168.100.75:8080/Axis2-bottom/services/SayHello.SayHelloHttpSoap11Endpoint/" />
    <wsdl2:endpoint name="SayHelloHttpSoap12Endpoint" 
    binding="tns:SayHelloSoap12Binding" 
    address="http://192.168.100.75:8080/Axis2-bottom/services/SayHello.SayHelloHttpSoap12Endpoint/" />
</wsdl2:service>
</wsdl2:description>`;

describe('WSDL 2.0 parser constructor', function () {
  it('should get an object wsdl 2.0 parser', function () {
    const parser = new Wsdl20Parser();
    expect(parser).to.be.an('object');
  });
});

describe('WSDL 2.0 parser parseFromXmlToObject', function () {

  it('should get an object in memory representing xml object with valid input', function () {
    const simpleInput = `<user is='great'>
      <name>Tobias</name>
      <familyName>Nickel</familyName>
      <profession>Software Developer</profession>
      <location>Shanghai / China</location>
      </user>`,
      parser = new Wsdl20Parser();
    let parsed = parser.parseFromXmlToObject(simpleInput);
    expect(parsed).to.be.an('object');
    expect(parsed).to.have.own.property('user');
    expect(parsed.user).to.have.own.property('name');
    expect(parsed.user[PARSER_ATRIBUTE_NAME_PLACE_HOLDER + 'is']).to.equal('great');

  });

  it('should throw an error when input is an empty string', function () {
    parser = new Wsdl20Parser();
    try {
      parser.parseFromXmlToObject('');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Empty input was proportionated');
    }
  });

  it('should throw an error when input is null', function () {
    parser = new Wsdl20Parser();
    try {
      parser.parseFromXmlToObject(null);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Empty input was proportionated');
    }
  });

  it('should throw an error when input is undefined', function () {
    parser = new Wsdl20Parser();
    try {
      parser.parseFromXmlToObject(undefined);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Empty input was proportionated');
    }
  });
});

describe('WSDL 2.0 parser assignNamespaces', function () {

  it('should assign namespaces to wsdl object', function () {
    const simpleInput = `<wsdl2:description 
    xmlns:wsdl2="http://www.w3.org/ns/wsdl"
    xmlns:wsoap="http://www.w3.org/ns/wsdl/soap"
    xmlns:whttp="http://www.w3.org/ns/wsdl/http"
    xmlns:ns="http://axis2.org"
    xmlns:wsaw="http://www.w3.org/2006/05/addressing/wsdl"
    xmlns:wsdlx="http://www.w3.org/ns/wsdl-extensions"
    xmlns:tns="http://axis2.org" 
    xmlns:wrpc="http://www.w3.org/ns/wsdl/rpc"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
    xmlns:ns1="http://org.apache.axis2/xsd" 
    targetNamespace="http://axis2.org">
  <wsdl2:documentation> Please Type your service description here </wsdl2:documentation>
</wsdl2:description>`,
      parser = new Wsdl20Parser();
    let wsdlObject = new WsdlObject(),
      parsed = parser.parseFromXmlToObject(simpleInput);
    wsdlObject = parser.assignNamespaces(wsdlObject, parsed);

    expect(wsdlObject).to.have.all.keys('targetNamespace',
      'wsdlNamespace', 'SOAPNamespace', 'HTTPNamespace',
      'SOAP12Namespace', 'schemaNamespace',
      'tnsNamespace', 'allNameSpaces', 'fileName', 'log',
      'operationsArray', 'securityPolicyArray',
      'securityPolicyNamespace', 'xmlParsed', 'version');

    expect(wsdlObject.targetNamespace.url).to.equal('http://axis2.org');
    expect(wsdlObject.tnsNamespace.url).to.equal('http://axis2.org');
    expect(wsdlObject.wsdlNamespace.key).to.equal('wsdl2');
    expect(wsdlObject.SOAPNamespace.key).to.equal('wsoap');
    expect(wsdlObject.schemaNamespace.key).to.equal('xs');
  });
});

describe('WSDL 2.0 parser getWsdlObject', function () {

  it('should get an object in memory representing wsdlObject 2.0',
    function () {
      const parser = new Wsdl20Parser();
      let wsdlObject = parser.getWsdlObject(WSDL_SAMPLE);
      expect(wsdlObject).to.be.an('object');
      expect(wsdlObject).to.have.all.keys('targetNamespace',
        'wsdlNamespace', 'SOAPNamespace', 'HTTPNamespace',
        'SOAP12Namespace', 'schemaNamespace',
        'tnsNamespace', 'allNameSpaces', 'fileName', 'log',
        'operationsArray', 'securityPolicyArray',
        'securityPolicyNamespace', 'xmlParsed', 'version');

      expect(wsdlObject.allNameSpaces).to.be.an('array');
      expect(wsdlObject.allNameSpaces.length).to.equal(7);
      xmlns = wsdlObject.allNameSpaces.find((namespace) => {
        return namespace.url === WSDL_NS_URL;
      });
      expect(xmlns.isDefault).to.equal(true);
      // asserts on namespaces
      expect(wsdlObject.targetNamespace.url).to.equal('http://greath.example.com/2004/wsdl/resSvc');
      expect(wsdlObject.tnsNamespace.url).to.equal('http://greath.example.com/2004/wsdl/resSvc');
      expect(wsdlObject.wsdlNamespace.key).to.equal('xmlns');
      expect(wsdlObject.SOAPNamespace.key).to.equal('wsoap');
      expect(wsdlObject.schemaNamespace.key).to.equal('xs');
    });

  it('should throw an error when parsedxml is null', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getWsdlObject(null);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('xmlDocumentContent must have a value');
    }
  });

  it('should throw an error when parsedxml is empty', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getWsdlObject('');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('xmlDocumentContent must have a value');
    }
  });
});

describe('WSDL 2.0 parser assignOperations', function () {

  it('should assign operations to wsdl object', function () {
    const parser = new Wsdl20Parser();
    let wsdlObject = new WsdlObject(),
      parsed = parser.parseFromXmlToObject(WSDL_SAMPLE);
    wsdlObject = parser.assignNamespaces(wsdlObject, parsed);
    wsdlObject = parser.assignOperations(wsdlObject, parsed);

    expect(wsdlObject).to.be.an('object');
    expect(wsdlObject.operationsArray).to.be.an('array');
    expect(wsdlObject.operationsArray.length).to.equal(1);

  });

  it('should assign operations to wsdl object when called with WSDL_SAMPLE_AXIS', function () {
    const parser = new Wsdl20Parser();
    let wsdlObject = new WsdlObject(),
      parsed = parser.parseFromXmlToObject(WSDL_SAMPLE_AXIS);
    wsdlObject = parser.assignNamespaces(wsdlObject, parsed);
    wsdlObject = parser.assignOperations(wsdlObject, parsed);

    expect(wsdlObject).to.be.an('object');
    expect(wsdlObject.operationsArray).to.be.an('array');
    expect(wsdlObject.operationsArray.length).to.equal(3);

  });

  it('should assign operations to wsdl object assignlocation correctly http', function () {
    const parser = new Wsdl20Parser();
    let wsdlObject = new WsdlObject(),
      parsed = parser.parseFromXmlToObject(WSDL_SAMPLE_AXIS);
    wsdlObject = parser.assignNamespaces(wsdlObject, parsed);
    wsdlObject = parser.assignOperations(wsdlObject, parsed);

    expect(wsdlObject).to.be.an('object');
    expect(wsdlObject.operationsArray).to.be.an('array');
    expect(wsdlObject.operationsArray.length).to.equal(3);


    expect(wsdlObject.operationsArray[0]).to.be.an('object')
      .and.to.deep.include({
        name: 'hi',
        method: POST_METHOD,
        protocol: SOAP_PROTOCOL,
        url: 'http://192.168.100.75:8080/Axis2-bottom/services/SayHello.SayHelloHttpSoap11Endpoint/',
        portName: 'SayHelloHttpSoap11Endpoint',
        serviceName: 'SayHello',
        xpathInfo: {
          xpath: '//description//binding[@name="SayHelloSoap11Binding"]//operation[@ref="tns:hi"]',
          wsdlNamespaceUrl: 'http://www.w3.org/ns/wsdl'
        }
      });

    expect(wsdlObject.operationsArray[1]).to.be.an('object')
      .and.to.deep.include({
        name: 'hi',
        method: POST_METHOD,
        protocol: SOAP12_PROTOCOL,
        url: 'http://192.168.100.75:8080/Axis2-bottom/services/SayHello.SayHelloHttpSoap12Endpoint/',
        portName: 'SayHelloHttpSoap12Endpoint',
        serviceName: 'SayHello',
        xpathInfo: {
          xpath: '//description//binding[@name="SayHelloSoap12Binding"]//operation[@ref="tns:hi"]',
          wsdlNamespaceUrl: 'http://www.w3.org/ns/wsdl'
        }
      });

    expect(wsdlObject.operationsArray[2]).to.be.an('object')
      .and.to.deep.include({
        name: 'hi',
        method: POST_METHOD,
        protocol: HTTP_PROTOCOL,
        url: 'http://192.168.100.75:8080/Axis2-bottom/services/SayHello.SayHelloHttpEndpoint/hi',
        portName: 'SayHelloHttpEndpoint',
        serviceName: 'SayHello',
        xpathInfo: {
          xpath: '//description//binding[@name="SayHelloHttpBinding"]//operation[@ref="tns:hi"]',
          wsdlNamespaceUrl: 'http://www.w3.org/ns/wsdl'
        }
      });

  });

  it('should assign operations to wsdl object when services is not in the file', function () {
    const parser = new Wsdl20Parser(),
      fileContent = fs.readFileSync(specialCasesWSDLs + '/NoServicesTag.wsdl', 'utf8');
    let wsdlObject = new WsdlObject(),
      parsed = parser.parseFromXmlToObject(fileContent);
    wsdlObject = parser.assignNamespaces(wsdlObject, parsed);
    wsdlObject = parser.assignOperations(wsdlObject, parsed);
    expect(wsdlObject.operationsArray).to.be.an('array');
    expect(wsdlObject.operationsArray.length).to.equal(3);

    expect(wsdlObject.log.errors.includes(DOC_HAS_NO_SERVICE_MESSAGE))
      .to.equal(true);

    expect(wsdlObject.operationsArray[0]).to.be.an('object')
      .and.to.include({
        name: 'hi',
        method: POST_METHOD,
        protocol: SOAP_PROTOCOL,
        url: '',
        portName: '',
        serviceName: ''
      });
  });

  it('should assign operations empty object when bindings is not in the file', function () {
    const parser = new Wsdl20Parser(),
      fileContent = fs.readFileSync(specialCasesWSDLs + '/NoBindingsTags.wsdl', 'utf8');
    let wsdlObject = new WsdlObject(),
      parsed = parser.parseFromXmlToObject(fileContent);
    wsdlObject = parser.assignNamespaces(wsdlObject, parsed);
    wsdlObject = parser.assignOperations(wsdlObject, parsed);
    expect(wsdlObject.operationsArray).to.be.an('array');
    expect(wsdlObject.operationsArray.length).to.equal(0);
    expect(wsdlObject.log.errors.includes(DOC_HAS_NO_BINDIGS_MESSAGE))
      .to.equal(true);
  });

  it('should assign operations empty object when bindings operations are not in the file', function () {
    const parser = new Wsdl20Parser(),
      fileContent = fs.readFileSync(specialCasesWSDLs + '/NoBindingsOperations.wsdl', 'utf8');
    let wsdlObject = new WsdlObject(),
      parsed = parser.parseFromXmlToObject(fileContent);
    wsdlObject = parser.assignNamespaces(wsdlObject, parsed);
    wsdlObject = parser.assignOperations(wsdlObject, parsed);
    expect(wsdlObject.operationsArray).to.be.an('array');
    expect(wsdlObject.operationsArray.length).to.equal(0);
    expect(wsdlObject.log.errors.includes(DOC_HAS_NO_BINDIGS_OPERATIONS_MESSAGE))
      .to.equal(true);
  });

  it('should assign operations to wsdl object when services endpoints are not in the file', function () {
    const parser = new Wsdl20Parser(),
      fileContent = fs.readFileSync(specialCasesWSDLs + '/NoServiceEndpoint.wsdl', 'utf8');
    let wsdlObject = new WsdlObject(),
      parsed = parser.parseFromXmlToObject(fileContent);
    wsdlObject = parser.assignNamespaces(wsdlObject, parsed);
    wsdlObject = parser.assignOperations(wsdlObject, parsed);
    expect(wsdlObject.operationsArray).to.be.an('array');
    expect(wsdlObject.operationsArray.length).to.equal(3);
    expect(wsdlObject.log.errors.includes(DOC_HAS_NO_SERVICE_PORT_MESSAGE))
      .to.equal(true);

    expect(wsdlObject.operationsArray[0]).to.be.an('object')
      .and.to.include({
        name: 'hi',
        method: POST_METHOD,
        protocol: SOAP_PROTOCOL,
        url: '',
        portName: '',
        serviceName: ''
      });
  });
});

describe('WSDL 2.0 parser getServiceAndServiceEndpointByBindingName', function () {
  it('should get the service endpoint when exists', function () {
    const parser = new Wsdl20Parser();
    let parsed = parser.parseFromXmlToObject(WSDL_SAMPLE),
      services = getServices(
        parsed,
        WSDL_ROOT
      ),
      serviceEndpoint = parser.getServiceAndServiceEndpointByBindingName(
        'reservationSOAPBinding',
        services,
        ''
      ).endpoint;
    expect(serviceEndpoint).to.be.an('object');
    expect(serviceEndpoint[PARSER_ATRIBUTE_NAME_PLACE_HOLDER + 'name']).to.equal('reservationEndpoint');
  });

  it('should get the service endpoint when exists and called with WSDL_SAMPLE_AXIS', function () {
    const parser = new Wsdl20Parser();
    let parsed = parser.parseFromXmlToObject(WSDL_SAMPLE_AXIS),
      services = getServices(
        parsed,
        WSDL_ROOT
      ),
      serviceEndpoint = parser.getServiceAndServiceEndpointByBindingName(
        'SayHelloSoap11Binding',
        services,
        'wsdl2:'
      ).endpoint;
    expect(serviceEndpoint).to.be.an('object');
    expect(serviceEndpoint[PARSER_ATRIBUTE_NAME_PLACE_HOLDER + 'name']).to.equal('SayHelloHttpSoap11Endpoint');
  });

  it('should throw an error when binding name is null', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getServiceAndServiceEndpointByBindingName(null, {}, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('BindingName must have a value');
    }
  });

  it('should throw an error when principal prefix is null', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getServiceAndServiceEndpointByBindingName('bindingName', {}, null);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('PrincipalPrefix must have a value');
    }
  });

  it('should throw an error when services is null', function () {

    const parser = new Wsdl20Parser();
    let wsdlObject = new WsdlObject(),
      serviceEndpoint = parser.getServiceAndServiceEndpointByBindingName('bindingName', null,
        'principal prefix', wsdlObject);
    expect(serviceEndpoint).to.equal(undefined);
  });

  it('should throw an error when service enpdoint is not found', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getServiceAndServiceEndpointByBindingName('bindingName', [], 'principal prefix');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get service endpoint from object');
    }
  });
  it('should throw an error when service enpdoint is array of null not found', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getServiceAndServiceEndpointByBindingName('bindingName', [null], 'principal prefix');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get service endpoint from object');
    }
  });
});

describe('WSDL 2.0 parser getInterfaceOperationByInterfaceNameAndOperationName', function () {
  it('should get interface operation by name', function () {
    const parser = new Wsdl20Parser();
    let parsed = parser.parseFromXmlToObject(WSDL_SAMPLE);
    services = getServices(parsed, WSDL_ROOT);
    operation = parser.getInterfaceOperationByInterfaceNameAndOperationName('reservationInterface',
      'opCheckAvailability', parsed, '');
    expect(operation).to.be.an('object');
    expect(operation[PARSER_ATRIBUTE_NAME_PLACE_HOLDER + 'name']).to.equal('opCheckAvailability');
  });

  it('should get interface operation by name in WSDL_SAMPLE_AXIS', function () {
    const parser = new Wsdl20Parser();
    let parsed = parser.parseFromXmlToObject(WSDL_SAMPLE_AXIS);
    services = getServices(parsed, WSDL_ROOT);
    operation = parser.getInterfaceOperationByInterfaceNameAndOperationName('ServiceInterface',
      'hi', parsed, 'wsdl2:');
    expect(operation).to.be.an('object');
    expect(operation[PARSER_ATRIBUTE_NAME_PLACE_HOLDER + 'name']).to.equal('hi');
  });

  it('should throw an error when parsedxml is null', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getInterfaceOperationByInterfaceNameAndOperationName('NumberConversionSoapType',
        'NumberToWords', null, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get porttype from undefined or null object');
    }
  });

  it('should throw an error when parsedxml is undefined', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getInterfaceOperationByInterfaceNameAndOperationName('NumberConversionSoapType',
        'NumberToWords', undefined, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get porttype from undefined or null object');
    }
  });

  it('should throw an error when parsedxml is an empty object', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getInterfaceOperationByInterfaceNameAndOperationName('NumberConversionSoapType',
        'NumberToWords', {}, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get port type from object');
    }
  });


  it('should throw an error when portTypeName is null', function () {
    try {
      const parser = new Wsdl20Parser();

      parser.getInterfaceOperationByInterfaceNameAndOperationName(null,
        'NumberToWords', {}, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get port type with no filter name');
    }
  });

  it('should throw an error when portTypeName is undefined', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getInterfaceOperationByInterfaceNameAndOperationName(undefined,
        'NumberToWords', {}, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get port type with no filter name');
    }
  });

  it('should throw an error when portTypeName is an empty string', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getInterfaceOperationByInterfaceNameAndOperationName('',
        'NumberToWords', {}, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get port type with no filter name');
    }
  });

  it('should throw an error when operationName is null', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getInterfaceOperationByInterfaceNameAndOperationName('some string',
        null, {}, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get port type with no filter operationName');
    }
  });

  it('should throw an error when operationName is undefined', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getInterfaceOperationByInterfaceNameAndOperationName('some string',
        undefined, {}, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get port type with no filter operationName');
    }
  });

  it('should throw an error when operationName is an empty string', function () {
    try {
      const parser = new Wsdl20Parser();
      parser.getInterfaceOperationByInterfaceNameAndOperationName('ddd',
        '', {}, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get port type with no filter operationName');
    }
  });
});

describe('WSDL 2.0 parser assignSecurity', function () {
  it('Should return a wsdlObject with securityPolicyArray if file has security', function () {
    const parser = new Wsdl20Parser();
    fileContent = fs.readFileSync(validWSDLs20 + '/Axis2WSD20WithSecurity.wsdl', 'utf8');
    let wsdlObject = new WsdlObject(),
      parsed = parser.parseFromXmlToObject(fileContent);
    wsdlObject = parser.assignNamespaces(wsdlObject, parsed);
    wsdlObject = parser.assignOperations(wsdlObject, parsed);
    wsdlObject = parser.assignSecurity(wsdlObject, parsed);

    expect(wsdlObject).to.be.an('object').to.include.key('securityPolicyArray');
  });
});

describe('WSDL 2.0 parser getDocumentationString', function () {
  it('should get the same when is called with string', function () {
    const parser = new Wsdl20Parser(),
      documentation = parser.getDocumentationStringFromNode('documentation');
    expect(documentation).to.eq('documentation');
  });

  it('should get the property value when is called with a node', function () {
    const parser = new Wsdl20Parser(),
      documentationNode = {};
    documentationNode['#text'] = 'documentation';
    documentation = parser.getDocumentationStringFromNode(documentationNode);
    expect(documentation).to.eq('documentation');
  });
});

describe('WSDL 2.0 parser  getBindingInfoFromBindingTag', function () {
  it('should throw an error when can not get protocol', function () {
    const parser = new Wsdl20Parser();
    try {
      let parsed = parser.parseFromXmlToObject(WSDL_SAMPLE),
        binding = getBindings(
          parsed,
          WSDL_ROOT
        )[0];
      parser.getBindingInfoFromBindingTag(binding, undefined, undefined);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not find protocol in those namespaces');
    }
  });
});

describe('WSDL 2.0 parser getInterfaceByInterfaceName', function () {
  it('should get an error when called with null parsed xml', function () {
    const parser = new Wsdl20Parser();
    try {
      parser.getInterfaceByInterfaceName('intefacename', null, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not interface from undefined or null object');
    }
  });
  it('should get an error when called with empty name', function () {
    const parser = new Wsdl20Parser();
    try {
      parser.getInterfaceByInterfaceName('', {}, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get interface with no filter name');
    }
  });
  it('should get an error when called not found property', function () {
    const parser = new Wsdl20Parser();
    try {
      parser.getInterfaceByInterfaceName('s', {}, '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get interface from object');
    }
  });
});

describe('WSDL 2.0 parser getElementFromInterfaceOperationInOut', function () {
  it('should get null when not found element', function () {
    const parser = new Wsdl20Parser(),
      element = parser.getElementFromInterfaceOperationInOut({}, null, 'notfound', '');
    expect(element).to.eq(null);
  });
});

describe('WSDL 2.0 parser getElementFromInterfaceOperationFault', function () {
  it('should get null when found element but not found ref', function () {
    const parser = new Wsdl20Parser(),
      element = parser.getElementFromInterfaceOperationFault({}, {
        outfault: {}
      }, null, '', 'outfault');
    expect(element).to.eq(null);
  });
});

describe('WSDL 2.0 parser getLocationFromBindingOperation', function () {
  it('should throw error when operation is null', function () {
    const parser = new Wsdl20Parser();
    try {
      parser.getLocationFromBindingOperation(null, {});
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get style info from operation undefined or null object');
    }
  });

  it('should get null when binding tag info is null', function () {
    const parser = new Wsdl20Parser();
    try {
      parser.getLocationFromBindingOperation({}, null);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get location info from operation');
    }
  });


});
