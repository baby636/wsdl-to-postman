const expect = require('chai').expect,
  {
    SchemaBuilderXSD
  } = require('../../lib/utils/SchemaBuilderXSD'),
  {
    Wsdl11Parser
  } = require('../../lib/Wsdl11Parser'),
  {
    PARSER_ATRIBUTE_NAME_PLACE_HOLDER
  } = require('../../lib/WsdlParserCommon'),
  CORE_SCHEMA = `<xsd:schema elementFormDefault="qualified" xmlns:tns="http://tempuri.org/"
    targetNamespace="http://tempuri.org/">
<xsd:import namespace="http://schemas.microsoft.com/2003/10/Serialization/Arrays" />
<xsd:import namespace="http://schemas.datacontract.org/2004/07/System" />
<xsd:element name="Test">
    <xsd:complexType>
        <xsd:sequence>
            <xsd:element minOccurs="0" maxOccurs="1" name="inputString" type="xsd:string" />
        </xsd:sequence>
    </xsd:complexType>
</xsd:element>
<xsd:element name="TestResponse">
    <xsd:complexType>
        <xsd:sequence>
            <xsd:element minOccurs="0" maxOccurs="1" name="TestResult" type="xsd:string" />
        </xsd:sequence>
    </xsd:complexType>
</xsd:element>
<xsd:element name="XmlMethod">
    <xsd:complexType>
        <xsd:sequence>
            <xsd:element minOccurs="0" maxOccurs="1" name="zapato">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:any processContents="lax" />
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>
        </xsd:sequence>
    </xsd:complexType>
</xsd:element>
<xsd:element name="XmlMethodResponse">
    <xsd:complexType />
</xsd:element>
<xsd:element name="TestCustomModel">
    <xsd:complexType>
        <xsd:sequence>
            <xsd:element minOccurs="0" maxOccurs="1" name="inputModel" type="tns:MyCustomModel" />
        </xsd:sequence>
    </xsd:complexType>
</xsd:element>
<xsd:element name="TestCustomModelResponse">
    <xsd:complexType>
        <xsd:sequence>
            <xsd:element minOccurs="0" maxOccurs="1" name="TestCustomModelResult" type="tns:MyCustomModel" />
        </xsd:sequence>
    </xsd:complexType>
</xsd:element>
<xsd:complexType name="MyCustomModel">
    <xsd:sequence>
        <xsd:element minOccurs="1" maxOccurs="1" name="Id" type="xsd:int" />
        <xsd:element minOccurs="0" maxOccurs="1" name="Name" type="xsd:string" />
        <xsd:element minOccurs="0" maxOccurs="1" name="Email" type="xsd:string" />
    </xsd:sequence>
</xsd:complexType>
</xsd:schema>`,
  CORE_FILE_INPUT = `<wsdl:definitions xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
   xmlns:tns="http://tempuri.org/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
   xmlns:http="http://schemas.microsoft.com/ws/06/2004/policy/http" 
   xmlns:msc="http://schemas.microsoft.com/ws/2005/12/wsdl/contract" 
   xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy" 
   xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" 
   xmlns:wsam="http://www.w3.org/2007/05/addressing/metadata" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" 
   targetNamespace="http://tempuri.org/" name="ISampleService">
<wsdl:types>
    <xsd:schema elementFormDefault="qualified" targetNamespace="http://tempuri.org/">
        <xsd:import namespace="http://schemas.microsoft.com/2003/10/Serialization/Arrays" />
        <xsd:import namespace="http://schemas.datacontract.org/2004/07/System" />
        <xsd:element name="Test">
            <xsd:complexType>
                <xsd:sequence>
                    <xsd:element minOccurs="0" maxOccurs="1" name="inputString" type="xsd:string" />
                </xsd:sequence>
            </xsd:complexType>
        </xsd:element>
        <xsd:element name="TestResponse">
            <xsd:complexType>
                <xsd:sequence>
                    <xsd:element minOccurs="0" maxOccurs="1" name="TestResult" type="xsd:string" />
                </xsd:sequence>
            </xsd:complexType>
        </xsd:element>
        <xsd:element name="XmlMethod">
            <xsd:complexType>
                <xsd:sequence>
                    <xsd:element minOccurs="0" maxOccurs="1" name="zapato">
                        <xsd:complexType>
                            <xsd:sequence>
                                <xsd:any processContents="lax" />
                            </xsd:sequence>
                        </xsd:complexType>
                    </xsd:element>
                </xsd:sequence>
            </xsd:complexType>
        </xsd:element>
        <xsd:element name="XmlMethodResponse">
            <xsd:complexType />
        </xsd:element>
        <xsd:element name="TestCustomModel">
            <xsd:complexType>
                <xsd:sequence>
                    <xsd:element minOccurs="0" maxOccurs="1" name="inputModel" type="tns:MyCustomModel" />
                </xsd:sequence>
            </xsd:complexType>
        </xsd:element>
        <xsd:element name="TestCustomModelResponse">
            <xsd:complexType>
                <xsd:sequence>
                    <xsd:element minOccurs="0" maxOccurs="1" name="TestCustomModelResult" type="tns:MyCustomModel" />
                </xsd:sequence>
            </xsd:complexType>
        </xsd:element>
        <xsd:complexType name="MyCustomModel">
            <xsd:sequence>
                <xsd:element minOccurs="1" maxOccurs="1" name="Id" type="xsd:int" />
                <xsd:element minOccurs="0" maxOccurs="1" name="Name" type="xsd:string" />
                <xsd:element minOccurs="0" maxOccurs="1" name="Email" type="xsd:string" />
            </xsd:sequence>
        </xsd:complexType>
    </xsd:schema>
</wsdl:types>
<wsdl:message name="ISampleService_Test_InputMessage">
    <wsdl:part name="parameters" element="tns:Test" />
</wsdl:message>
<wsdl:message name="ISampleService_Test_OutputMessage">
    <wsdl:part name="parameters" element="tns:TestResponse" />
</wsdl:message>
<wsdl:message name="ISampleService_XmlMethod_InputMessage">
    <wsdl:part name="parameters" element="tns:XmlMethod" />
</wsdl:message>
<wsdl:message name="ISampleService_XmlMethod_OutputMessage">
    <wsdl:part name="parameters" element="tns:XmlMethodResponse" />
</wsdl:message>
<wsdl:message name="ISampleService_TestCustomModel_InputMessage">
    <wsdl:part name="parameters" element="tns:TestCustomModel" />
</wsdl:message>
<wsdl:message name="ISampleService_TestCustomModel_OutputMessage">
    <wsdl:part name="parameters" element="tns:TestCustomModelResponse" />
</wsdl:message>
<wsdl:portType name="ISampleService">
    <wsdl:operation name="Test">
        <wsdl:input message="tns:ISampleService_Test_InputMessage" />
        <wsdl:output message="tns:ISampleService_Test_OutputMessage" />
    </wsdl:operation>
    <wsdl:operation name="XmlMethod">
        <wsdl:input message="tns:ISampleService_XmlMethod_InputMessage" />
        <wsdl:output message="tns:ISampleService_XmlMethod_OutputMessage" />
    </wsdl:operation>
    <wsdl:operation name="TestCustomModel">
        <wsdl:input message="tns:ISampleService_TestCustomModel_InputMessage" />
        <wsdl:output message="tns:ISampleService_TestCustomModel_OutputMessage" />
    </wsdl:operation>
</wsdl:portType>
<wsdl:binding name="BasicHttpBinding" type="tns:ISampleService">
    <soap:binding transport="http://schemas.xmlsoap.org/soap/http" />
    <wsdl:operation name="Test">
        <soap:operation soapAction="http://tempuri.org/ISampleService/Test" style="document" />
        <wsdl:input>
            <soap:body use="literal" />
        </wsdl:input>
        <wsdl:output>
            <soap:body use="literal" />
        </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="XmlMethod">
        <soap:operation soapAction="http://tempuri.org/ISampleService/XmlMethod" style="document" />
        <wsdl:input>
            <soap:body use="literal" />
        </wsdl:input>
        <wsdl:output>
            <soap:body use="literal" />
        </wsdl:output>
    </wsdl:operation>
    <wsdl:operation name="TestCustomModel">
        <soap:operation soapAction="http://tempuri.org/ISampleService/TestCustomModel" style="document" />
        <wsdl:input>
            <soap:body use="literal" />
        </wsdl:input>
        <wsdl:output>
            <soap:body use="literal" />
        </wsdl:output>
    </wsdl:operation>
</wsdl:binding>
<wsdl:service name="ISampleService">
    <wsdl:port name="BasicHttpBinding" binding="tns:BasicHttpBinding">
        <soap:address location="https://localhost:5001/Service.asmx" />
    </wsdl:port>
</wsdl:service>
</wsdl:definitions>
`;

describe('SchemaBuilderXSD Constructor', function() {
  it('should get an object of the schema builder', function() {
    const builder = new SchemaBuilderXSD();
    expect(builder).to.be.a('object');
  });

});

describe('SchemaBuilderXSD parseSchema', function() {
  it('should get an object of the schema parsed', function() {
    const builder = new SchemaBuilderXSD(),
      parsedSchema = builder.parseSchema(CORE_SCHEMA);
    expect(parsedSchema).to.be.a('object');
  });

});

describe('SchemaBuilderXSD getElements', function() {
  it('should get schema elements', function() {
    const builder = new SchemaBuilderXSD(),
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xsd',
        prefixFilter: 'xsd:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://tempuri.org/',
        isDefault: false
      },
      parsedXml = parser.parseFromXmlToObject(CORE_FILE_INPUT),
      elements = builder.getElements(parsedXml, 'wsdl:', 'definitions', schemaNameSpace,
        thisNameSpace, PARSER_ATRIBUTE_NAME_PLACE_HOLDER);
    expect(elements).to.be.a('array');
    expect(elements.length).to.eq(6);

    expect(elements[5].name).to.equal('TestCustomModel');
    expect(elements[5].isComplex).to.equal(true);
    expect(elements[5].type).to.equal('complex');
    expect(elements[5].minOccurs).to.equal('1');
    expect(elements[5].maxOccurs).to.equal('1');
    expect(elements[5].namespace).to.equal('http://tempuri.org/');
    expect(elements[5].children).to.be.an('array');

    expect(elements[5].children[0].name).to.equal('inputModel');
    expect(elements[5].children[0].isComplex).to.equal(true);
    expect(elements[5].children[0].type).to.equal('MyCustomModel');
    expect(elements[5].children[0].children).to.be.an('array');
    expect(elements[5].children[0].children.length).to.equal(3);

    expect(elements[5].children[0].children[0].name).to.equal('Id');
    expect(elements[5].children[0].children[0].isComplex).to.equal(false);
    expect(elements[5].children[0].children[0].type).to.equal('integer');
    expect(elements[5].children[0].children[0].maximum).to.equal(2147483647);
    expect(elements[5].children[0].children[0].minimum).to.equal(-2147483648);
    expect(elements[5].children[0].children[0].children).to.be.an('array');
    expect(elements[5].children[0].children[0].children).to.be.empty;

    expect(elements[5].children[0].children[1].name).to.equal('Name');
    expect(elements[5].children[0].children[1].isComplex).to.equal(false);
    expect(elements[5].children[0].children[1].type).to.equal('string');
    expect(elements[5].children[0].children[1].minOccurs).to.equal('0');
    expect(elements[5].children[0].children[1].maxOccurs).to.equal('1');
    expect(elements[5].children[0].children[1].children).to.be.an('array');
    expect(elements[5].children[0].children[1].children).to.be.empty;

    expect(elements[5].children[0].children[2].name).to.equal('Email');
    expect(elements[5].children[0].children[2].isComplex).to.equal(false);
    expect(elements[5].children[0].children[2].type).to.equal('string');
    expect(elements[5].children[0].children[2].minOccurs).to.equal('0');
    expect(elements[5].children[0].children[2].maxOccurs).to.equal('1');
    expect(elements[5].children[0].children[2].children).to.be.an('array');
    expect(elements[5].children[0].children[2].children).to.be.empty;
  });

  it('should get an empty array when the input has no elements', function() {
    const simpleInput = `<?xml version="1.0" encoding="UTF-8"?>
    <definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
    xmlns:xs="http://www.w3.org/2001/XMLSchema" 
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
    xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
    xmlns:tns="http://www.dataaccess.com/webservicesserver/" 
    name="NumberConversion" targetNamespace="http://www.dataaccess.com/webservicesserver/">
      <types>
        <xs:schema elementFormDefault="qualified"
         targetNamespace="http://www.dataaccess.com/webservicesserver/">
        </xs:schema>
      </types>
    </definitions>`,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xs',
        prefixFilter: 'xs:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://tempuri.org/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),
      elements = builder.getElements(parsedXml, '', 'definitions', schemaNameSpace,
        thisNameSpace, PARSER_ATRIBUTE_NAME_PLACE_HOLDER);
    expect(elements).to.be.an('array');
    expect(elements).to.be.empty;
  });

  it('should get an array of types with 1 root and 1 child', function() {
    const simpleInput = `<?xml version="1.0" encoding="UTF-8"?>
      <definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
      xmlns:xs="http://www.w3.org/2001/XMLSchema" 
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
      xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
      xmlns:tns="http://www.dataaccess.com/webservicesserver/" 
      name="NumberConversion" targetNamespace="http://www.dataaccess.com/webservicesserver/">
        <types>
          <xs:schema elementFormDefault="qualified"
           targetNamespace="http://www.dataaccess.com/webservicesserver/">
            <xs:element name="NumberToWords">
              <xs:complexType>
                <xs:sequence>
                  <xs:element name="ubiNum" type="xs:unsignedLong"/>
                </xs:sequence>
              </xs:complexType>
            </xs:element>
          </xs:schema>
        </types>
      </definitions>`,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xs',
        prefixFilter: 'xs:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://www.dataaccess.com/webservicesserver/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),

      elements = builder.getElements(parsedXml, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);

    expect(elements).to.be.an('array');

    expect(elements[0].name).to.equal('NumberToWords');
    expect(elements[0].isComplex).to.equal(true);
    expect(elements[0].type).to.equal('complex');
    expect(elements[0].minOccurs).to.equal('0');
    expect(elements[0].maxOccurs).to.equal('1');
    expect(elements[0].namespace).to.equal('http://www.dataaccess.com/webservicesserver/');
    expect(elements[0].children).to.be.an('array');

    expect(elements[0].children[0].name).to.equal('ubiNum');
    expect(elements[0].children[0].isComplex).to.equal(false);
    expect(elements[0].children[0].type).to.equal('integer');
    expect(elements[0].children[0].minOccurs).to.equal('1');
    expect(elements[0].children[0].maxOccurs).to.equal('1');
    expect(elements[0].children[0].children).to.be.an('array');
    expect(elements[0].children[0].children).to.be.empty;


    expect(elements[0].name).to.equal('NumberToWords');
    expect(elements[0].isComplex).to.equal(true);
    expect(elements[0].type).to.equal('complex');
    expect(elements[0].minOccurs).to.equal('0');
    expect(elements[0].maxOccurs).to.equal('1');
    expect(elements[0].namespace).to.equal('http://www.dataaccess.com/webservicesserver/');
    expect(elements[0].children).to.be.an('array');

    expect(elements[0].children[0].name).to.equal('ubiNum');
    expect(elements[0].children[0].isComplex).to.equal(false);
    expect(elements[0].children[0].type).to.equal('integer');
    expect(elements[0].children[0].minOccurs).to.equal('1');
    expect(elements[0].children[0].maxOccurs).to.equal('1');
    expect(elements[0].children[0].children).to.be.an('array');
    expect(elements[0].children[0].children).to.be.empty;
  });

  it('should get an array of types with 4 root and 1 child per root', function() {
    const simpleInput = `<?xml version="1.0" encoding="UTF-8"?>
      <definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
      xmlns:xs="http://www.w3.org/2001/XMLSchema" 
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
      xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
      xmlns:tns="http://www.dataaccess.com/webservicesserver/" 
      name="NumberConversion" targetNamespace="http://www.dataaccess.com/webservicesserver/">
      <types>
      <xs:schema elementFormDefault="qualified" targetNamespace="http://www.dataaccess.com/webservicesserver/">
        <xs:element name="NumberToWords">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="ubiNum" type="xs:unsignedLong"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
        <xs:element name="NumberToWordsResponse">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="NumberToWordsResult" type="xs:string"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
        <xs:element name="NumberToDollars">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="dNum" type="xs:decimal"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
        <xs:element name="NumberToDollarsResponse">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="NumberToDollarsResult" type="xs:string"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
      </xs:schema>
    </types>
      </definitions>`,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xs',
        prefixFilter: 'xs:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://www.dataaccess.com/webservicesserver/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),
      elements = builder.getElements(parsedXml, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);

    expect(elements).to.be.an('array');

    expect(elements[0].name).to.equal('NumberToWords');
    expect(elements[0].isComplex).to.equal(true);
    expect(elements[0].type).to.equal('complex');
    expect(elements[0].minOccurs).to.equal('0');
    expect(elements[0].maxOccurs).to.equal('1');
    expect(elements[0].namespace).to.equal('http://www.dataaccess.com/webservicesserver/');
    expect(elements[0].children).to.be.an('array');

    expect(elements[0].children[0].name).to.equal('ubiNum');
    expect(elements[0].children[0].isComplex).to.equal(false);
    expect(elements[0].children[0].type).to.equal('integer');
    expect(elements[0].children[0].minOccurs).to.equal('1');
    expect(elements[0].children[0].maxOccurs).to.equal('1');
    expect(elements[0].children[0].children).to.be.an('array');
    expect(elements[0].children[0].children).to.be.empty;

    expect(elements[1].name).to.equal('NumberToWordsResponse');
    expect(elements[1].isComplex).to.equal(true);
    expect(elements[1].type).to.equal('complex');
    expect(elements[1].minOccurs).to.equal('0');
    expect(elements[1].maxOccurs).to.equal('1');
    expect(elements[1].namespace).to.equal('http://www.dataaccess.com/webservicesserver/');
    expect(elements[1].children).to.be.an('array');

    expect(elements[1].children[0].name).to.equal('NumberToWordsResult');
    expect(elements[1].children[0].isComplex).to.equal(false);
    expect(elements[1].children[0].type).to.equal('string');
    expect(elements[1].children[0].minOccurs).to.equal('1');
    expect(elements[1].children[0].maxOccurs).to.equal('1');
    expect(elements[1].children[0].children).to.be.an('array');
    expect(elements[1].children[0].children).to.be.empty;

    expect(elements[2].name).to.equal('NumberToDollars');
    expect(elements[2].isComplex).to.equal(true);
    expect(elements[2].type).to.equal('complex');
    expect(elements[2].minOccurs).to.equal('0');
    expect(elements[2].maxOccurs).to.equal('1');
    expect(elements[2].namespace).to.equal('http://www.dataaccess.com/webservicesserver/');
    expect(elements[2].children).to.be.an('array');

    expect(elements[2].children[0].name).to.equal('dNum');
    expect(elements[2].children[0].isComplex).to.equal(false);
    expect(elements[2].children[0].type).to.equal('number');
    expect(elements[2].children[0].minOccurs).to.equal('1');
    expect(elements[2].children[0].maxOccurs).to.equal('1');
    expect(elements[2].children[0].children).to.be.an('array');
    expect(elements[2].children[0].children).to.be.empty;

    expect(elements[3].name).to.equal('NumberToDollarsResponse');
    expect(elements[3].isComplex).to.equal(true);
    expect(elements[3].type).to.equal('complex');
    expect(elements[3].minOccurs).to.equal('0');
    expect(elements[3].maxOccurs).to.equal('1');
    expect(elements[3].namespace).to.equal('http://www.dataaccess.com/webservicesserver/');
    expect(elements[3].children).to.be.an('array');

    expect(elements[3].children[0].name).to.equal('NumberToDollarsResult');
    expect(elements[3].children[0].isComplex).to.equal(false);
    expect(elements[3].children[0].type).to.equal('string');
    expect(elements[3].children[0].minOccurs).to.equal('1');
    expect(elements[3].children[0].maxOccurs).to.equal('1');
    expect(elements[3].children[0].children).to.be.an('array');
    expect(elements[3].children[0].children).to.be.empty;
  });

  it('should get an array of types with 1 root and 1 complex type', function() {
    const simpleInput = `<wsdl:definitions
       xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
       xmlns:tns="http://tempuri.org/" 
       xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
       xmlns:http="http://schemas.microsoft.com/ws/06/2004/policy/http" 
       xmlns:msc="http://schemas.microsoft.com/ws/2005/12/wsdl/contract" 
       xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy" 
       xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" 
       xmlns:wsam="http://www.w3.org/2007/05/addressing/metadata" 
       xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" 
       targetNamespace="http://tempuri.org/" 
       name="ISampleService">
       <wsdl:types>
       <xsd:schema elementFormDefault="qualified" targetNamespace="http://tempuri.org/">
           <xsd:import namespace="http://schemas.microsoft.com/2003/10/Serialization/Arrays" />
           <xsd:import namespace="http://schemas.datacontract.org/2004/07/System" />
           <xsd:element name="TestCustomModel">
               <xsd:complexType>
                   <xsd:sequence>
                       <xsd:element minOccurs="0" maxOccurs="1" name="inputModel" type="tns:MyCustomModel" />
                   </xsd:sequence>
               </xsd:complexType>
           </xsd:element>
           <xsd:element name="TestCustomModelResponse">
               <xsd:complexType>
                   <xsd:sequence>
                       <xsd:element minOccurs="0" maxOccurs="1" name="TestCustomModelResult" 
                       type="tns:MyCustomModel" />
                   </xsd:sequence>
               </xsd:complexType>
           </xsd:element>
           <xsd:complexType name="MyCustomModel">
               <xsd:sequence>
                   <xsd:element minOccurs="1" maxOccurs="1" name="Id" type="xsd:int" />
                   <xsd:element minOccurs="0" maxOccurs="1" name="Name" type="xsd:string" />
                   <xsd:element minOccurs="0" maxOccurs="1" name="Email" type="xsd:string" />
               </xsd:sequence>
           </xsd:complexType>
       </xsd:schema>
   </wsdl:types>
  </wsdl:definitions>
  `,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xsd',
        prefixFilter: 'xsd:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://tempuri.org/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),
      elements = builder.getElements(parsedXml, 'wsdl:', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);
    expect(elements).to.be.an('array');

    expect(elements[1].name).to.equal('TestCustomModel');
    expect(elements[1].isComplex).to.equal(true);
    expect(elements[1].type).to.equal('complex');
    expect(elements[1].minOccurs).to.equal('1');
    expect(elements[1].maxOccurs).to.equal('1');
    expect(elements[1].namespace).to.equal('http://tempuri.org/');
    expect(elements[1].children).to.be.an('array');

    expect(elements[1].children[0].name).to.equal('inputModel');
    expect(elements[1].children[0].isComplex).to.equal(true);
    expect(elements[1].children[0].type).to.equal('MyCustomModel');
    expect(elements[1].children[0].minOccurs).to.equal('1');
    expect(elements[1].children[0].maxOccurs).to.equal('1');
    expect(elements[1].children[0].children).to.be.an('array');
    expect(elements[1].children[0].children.length).to.equal(3);

    expect(elements[1].children[0].children[0].name).to.equal('Id');
    expect(elements[1].children[0].children[0].isComplex).to.equal(false);
    expect(elements[1].children[0].children[0].type).to.equal('integer');
    expect(elements[1].children[0].children[0].minOccurs).to.equal('1');
    expect(elements[1].children[0].children[0].maxOccurs).to.equal('1');
    expect(elements[1].children[0].children[0].children).to.be.an('array');
    expect(elements[1].children[0].children[0].children).to.be.empty;

    expect(elements[1].children[0].children[1].name).to.equal('Name');
    expect(elements[1].children[0].children[1].isComplex).to.equal(false);
    expect(elements[1].children[0].children[1].type).to.equal('string');
    expect(elements[1].children[0].children[1].minOccurs).to.equal('0');
    expect(elements[1].children[0].children[1].maxOccurs).to.equal('1');
    expect(elements[1].children[0].children[1].children).to.be.an('array');
    expect(elements[1].children[0].children[1].children).to.be.empty;

    expect(elements[1].children[0].children[2].name).to.equal('Email');
    expect(elements[1].children[0].children[2].isComplex).to.equal(false);
    expect(elements[1].children[0].children[2].type).to.equal('string');
    expect(elements[1].children[0].children[2].minOccurs).to.equal('0');
    expect(elements[1].children[0].children[2].maxOccurs).to.equal('1');
    expect(elements[1].children[0].children[2].children).to.be.an('array');
    expect(elements[1].children[0].children[2].children).to.be.empty;
  });

  it('should get an array of types with 1 root and 1 complex type Scenario 2', function() {
    const simpleInput = `<definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
      xmlns:xs="http://www.w3.org/2001/XMLSchema" 
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
      xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
      xmlns:tns="http://www.oorsprong.org/websamples.countryinfo" 
      name="CountryInfoService" targetNamespace="http://www.oorsprong.org/websamples.countryinfo">
      <types>
         <xs:schema elementFormDefault="qualified" targetNamespace="http://www.oorsprong.org/websamples.countryinfo">
             <xs:complexType name="tCurrency">
                 <xs:sequence>
                     <xs:element name="sISOCode" type="xs:string" />
                     <xs:element name="sName" type="xs:string" />
                 </xs:sequence>
             </xs:complexType>
             <xs:complexType name="ArrayOftCurrency">
                 <xs:sequence>
                     <xs:element name="tCurrency" 
                     type="tns:tCurrency" minOccurs="0" maxOccurs="unbounded" nillable="true" />
                 </xs:sequence>
             </xs:complexType>
             <xs:element name="ListOfCurrenciesByCodeResponse">
                 <xs:complexType>
                     <xs:sequence>
                         <xs:element name="ListOfCurrenciesByCodeResult" type="tns:ArrayOftCurrency" />
                     </xs:sequence>
                 </xs:complexType>
             </xs:element>
         </xs:schema>
     </types>
  </definitions>`,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xs',
        prefixFilter: 'xs:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://www.oorsprong.org/websamples.countryinfo',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsed = parser.parseFromXmlToObject(simpleInput),
      elements = builder.getElements(parsed, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);
    expect(elements).to.be.an('array');

    expect(elements[0].name).to.equal('ListOfCurrenciesByCodeResponse');
    expect(elements[0].isComplex).to.equal(true);
    expect(elements[0].type).to.equal('complex');
    expect(elements[0].minOccurs).to.equal('0');
    expect(elements[0].maxOccurs).to.equal('1');
    expect(elements[0].namespace).to.equal('http://www.oorsprong.org/websamples.countryinfo');
    expect(elements[0].children).to.be.an('array');

    expect(elements[0].children[0].name).to.equal('ListOfCurrenciesByCodeResult');
    expect(elements[0].children[0].isComplex).to.equal(true);

    expect(elements[0].children[0].children[0].name).to.equal('tCurrency');
    expect(elements[0].children[0].children[0].isComplex).to.equal(true);

    expect(elements[0].children[0].children[0].children[0].name).to.equal('sISOCode');
    expect(elements[0].children[0].children[0].children[0].isComplex).to.equal(false);
    expect(elements[0].children[0].children[0].children[0].type).to.equal('string');

  });

  it('should throw an error when parsed is undefined', function() {
    const schemaNameSpace = {
        key: 'xs',
        prefixFilter: 'xs:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://www.oorsprong.org/websamples.countryinfo',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    try {
      builder.getElements(undefined, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get elements from undefined or null object');
    }
  });

  it('should throw an error when parsed is null', function() {
    const schemaNameSpace = {
        key: 'xs',
        prefixFilter: 'xs:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://www.oorsprong.org/websamples.countryinfo',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    try {
      builder.getElements(null, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get elements from undefined or null object');
    }
  });

  it('should get an array of types with 1 root and 1 child with simple types one level', function() {
    const simpleInput = `<?xml version="1.0" encoding="UTF-8"?>
      <definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
      xmlns:xs="http://www.w3.org/2001/XMLSchema" 
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
      xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
      xmlns:tns="http://www.dataaccess.com/webservicesserver/" 
      name="NumberConversion" targetNamespace="http://www.dataaccess.com/webservicesserver/">
        <types>
        <xs:schema targetNamespace="http://www.dataaccess.com/webservicesserver/"  
        xmlns:xs="http://www.w3.org/2001/XMLSchema">
        <xs:simpleType name="C">
        <xs:restriction base="xs:string">
          <xs:minLength value="1"/>
        </xs:restriction>
        </xs:simpleType>
        <xs:simpleType name="Char_20">
        <xs:restriction base="C">
          <xs:minLength value="1"/>
          <xs:maxLength value="20"/>
        </xs:restriction>
        </xs:simpleType>
        <xs:element name="Test">
            <xs:complexType>
                <xs:sequence>
                    <xs:element minOccurs="0" maxOccurs="1" name="inputString" type="C" />
                </xs:sequence>
            </xs:complexType>
        </xs:element>
        </xs:schema>
        </types>
      </definitions>`,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xs',
        prefixFilter: 'xs:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://www.dataaccess.com/webservicesserver/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),

      elements = builder.getElements(parsedXml, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);

    expect(elements).to.be.an('array');

    expect(elements[0].name).to.equal('Test');
    expect(elements[0].isComplex).to.equal(true);
    expect(elements[0].type).to.equal('complex');
    expect(elements[0].minOccurs).to.equal('1');
    expect(elements[0].maxOccurs).to.equal('1');
    expect(elements[0].namespace).to.equal('http://www.dataaccess.com/webservicesserver/');
    expect(elements[0].children).to.be.an('array');

    expect(elements[0].children[0].name).to.equal('inputString');
    expect(elements[0].children[0].isComplex).to.equal(false);
    expect(elements[0].children[0].type).to.equal('string');
    expect(elements[0].children[0].minLength).to.equal(1);
    expect(elements[0].children[0].maxLength).to.equal(undefined);
    expect(elements[0].children[0].children).to.be.an('array');
    expect(elements[0].children[0].children).to.be.empty;
  });

  it('should get an array of types with 1 root and 1 child with simple types three levels', function() {
    const simpleInput = `<?xml version="1.0" encoding="UTF-8"?>
      <definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
      xmlns:xs="http://www.w3.org/2001/XMLSchema" 
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
      xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
      xmlns:tns="http://www.dataaccess.com/webservicesserver/" 
      name="NumberConversion" targetNamespace="http://www.dataaccess.com/webservicesserver/">
        <types>
        <xs:schema targetNamespace="http://www.dataaccess.com/webservicesserver/"  
        xmlns:xs="http://www.w3.org/2001/XMLSchema">
        <xs:simpleType name="C">
        <xs:restriction base="xs:string">
        </xs:restriction>
        </xs:simpleType>
        <xs:simpleType name="Char_20">
        <xs:restriction base="C">
          <xs:minLength value="1"/>
          <xs:maxLength value="20"/>
        </xs:restriction>
        </xs:simpleType>
        <xs:simpleType name="Char_20_10">
        <xs:restriction base="Char_20">
	      <xs:minLength value="10"/>
        </xs:restriction>
        </xs:simpleType>
        <xs:element name="Test">
            <xs:complexType>
                <xs:sequence>
                    <xs:element minOccurs="0" maxOccurs="1" name="inputString" type="Char_20_10" />
                </xs:sequence>
            </xs:complexType>
        </xs:element>
        </xs:schema>
        </types>
      </definitions>`,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xs',
        prefixFilter: 'xs:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://www.dataaccess.com/webservicesserver/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),

      elements = builder.getElements(parsedXml, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);

    expect(elements).to.be.an('array');

    expect(elements[0].name).to.equal('Test');
    expect(elements[0].isComplex).to.equal(true);
    expect(elements[0].type).to.equal('complex');
    expect(elements[0].minOccurs).to.equal('1');
    expect(elements[0].maxOccurs).to.equal('1');
    expect(elements[0].namespace).to.equal('http://www.dataaccess.com/webservicesserver/');
    expect(elements[0].children).to.be.an('array');

    expect(elements[0].children[0].name).to.equal('inputString');
    expect(elements[0].children[0].isComplex).to.equal(false);
    expect(elements[0].children[0].type).to.equal('string');
    expect(elements[0].children[0].minLength).to.equal(10);
    expect(elements[0].children[0].maxLength).to.equal(20);
    expect(elements[0].children[0].children).to.be.an('array');
    expect(elements[0].children[0].children).to.be.empty;
  });

  it('should get an array of types with 1 root and 1 child with simple types with enum', function() {
    const simpleInput = `<?xml version="1.0" encoding="UTF-8"?>
      <definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
      xmlns:s="http://www.w3.org/2001/XMLSchema" 
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
      xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
      xmlns:tns="http://www.dataaccess.com/webservicesserver/" 
      name="NumberConversion" targetNamespace="https://geoservices.tamu.edu/">
        <types>
        <s:schema elementFormDefault="qualified" targetNamespace="https://geoservices.tamu.edu/" 
        xmlns:s="http://www.w3.org/2001/XMLSchema"
        xmlns:tns="https://geoservices.tamu.edu/">
        <s:element name="GeocodeAddressParsed">
        <s:complexType>
            <s:sequence>
                <s:element minOccurs="1" maxOccurs="1" name="censusYear" type="tns:CensusYear" />
            </s:sequence>
        </s:complexType>
       </s:element>
       <s:simpleType name="CensusYear">
        <s:restriction base="s:string">
            <s:enumeration value="Unknown" />
            <s:enumeration value="NineteenNinety" />
            <s:enumeration value="TwoThousand" />
            <s:enumeration value="TwoThousandTen" />
            <s:enumeration value="AllAvailable" />
        </s:restriction>
       </s:simpleType>
       </s:schema>
        </types> 
        </definitions > `,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 's',
        prefixFilter: 's:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'https://geoservices.tamu.edu/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),

      elements = builder.getElements(parsedXml, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);

    expect(elements).to.be.an('array');

    expect(elements[0].name).to.equal('GeocodeAddressParsed');
    expect(elements[0].isComplex).to.equal(true);
    expect(elements[0].type).to.equal('complex');
    expect(elements[0].maxOccurs).to.equal('1');
    expect(elements[0].namespace).to.equal('https://geoservices.tamu.edu/');
    expect(elements[0].children).to.be.an('array');

    expect(elements[0].children[0].name).to.equal('censusYear');
    expect(elements[0].children[0].isComplex).to.equal(false);
    expect(elements[0].children[0].type).to.equal('string');
    expect(elements[0].children[0].enumValues).to.be.an('array');
    expect(elements[0].children[0].enumValues.length).to.equal(5);
    expect(elements[0].children[0].children).to.be.an('array');
    expect(elements[0].children[0].children).to.be.empty;
    expect(elements[0].children[0].enumValues).to.have.members(['Unknown',
      'NineteenNinety',
      'TwoThousand',
      'TwoThousandTen',
      'AllAvailable'
    ]);
  });

  it('should get an array of types with 1 root and 1 child with simple types with enum of integers', function() {
    const simpleInput = `<?xml version="1.0" encoding="UTF-8"?>
      <definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
      xmlns:s="http://www.w3.org/2001/XMLSchema" 
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
      xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
      xmlns:tns="http://www.dataaccess.com/webservicesserver/" 
      name="NumberConversion" targetNamespace="https://geoservices.tamu.edu/">
        <types>
        <s:schema elementFormDefault="qualified" targetNamespace="https://geoservices.tamu.edu/" 
        xmlns:s="http://www.w3.org/2001/XMLSchema"
        xmlns:tns="https://geoservices.tamu.edu/">
        <s:element name="foobar" type="enumType"/>
        <s:simpleType name="enumType">
        <s:restriction base="s:integer">
          <s:enumeration value="1"/>
          <s:enumeration value="1011"/>
          <s:enumeration value="1032"/>
        </s:restriction>
        </s:simpleType>
       </s:schema>
        </types> 
        </definitions > `,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 's',
        prefixFilter: 's:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'https://geoservices.tamu.edu/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),

      elements = builder.getElements(parsedXml, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);

    expect(elements).to.be.an('array');

    expect(elements[0].name).to.equal('foobar');
    expect(elements[0].isComplex).to.equal(false);
    expect(elements[0].type).to.equal('integer');
    expect(elements[0].maxOccurs).to.equal('1');
    expect(elements[0].namespace).to.equal('https://geoservices.tamu.edu/');
    expect(elements[0].children).to.be.an('array');
    expect(elements[0].children).to.be.empty;
    expect(elements[0].enumValues).to.have.members(['1',
      '1011',
      '1032'
    ]);
  });

  it('should get an array of elements defined in the message when all are knowntypes', function() {
    const simpleInput = `<?xml version="1.0" encoding="UTF-8"?>
      <wsdl:definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
      xmlns:s="http://www.w3.org/2001/XMLSchema" 
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
      xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
      xmlns:tns="http://www.dataaccess.com/webservicesserver/" 
      name="NumberConversion" targetNamespace="https://geoservices.tamu.edu/">
        <wsdl:types>
        <s:schema elementFormDefault="qualified" targetNamespace="https://geoservices.tamu.edu/" 
        xmlns:s="http://www.w3.org/2001/XMLSchema"
        xmlns:tns="https://geoservices.tamu.edu/">
        <s:element name="foobar" type="enumType"/>
        <s:simpleType name="enumType">
        <s:restriction base="s:integer">
          <s:enumeration value="1"/>
          <s:enumeration value="1011"/>
          <s:enumeration value="1032"/>
        </s:restriction>
        </s:simpleType>
       </s:schema>
        </wsdl:types> 
        <wsdl:message name="GeocodeAddressParsedHttpGetIn">
        <wsdl:part name="number" type="s:string" />
        <wsdl:part name="numberFractional" type="s:string" />
        <wsdl:part name="preDirectional" type="s:string" />
        <wsdl:part name="preQualifier" type="s:string" />
        <wsdl:part name="preType" type="s:string" />
        <wsdl:part name="preArticle" type="s:string" />
        <wsdl:part name="name" type="s:string" />
        <wsdl:part name="suffix" type="s:string" />
        <wsdl:part name="postArticle" type="s:string" />
        <wsdl:part name="postQualifier" type="s:string" />
        <wsdl:part name="postDirectional" type="s:string" />
        <wsdl:part name="suiteType" type="s:string" />
        <wsdl:part name="suiteNumber" type="s:string" />
        <wsdl:part name="city" type="s:string" />
        <wsdl:part name="state" type="s:string" />
        <wsdl:part name="zip" type="s:string" />
        <wsdl:part name="apiKey" type="s:string" />
        <wsdl:part name="version" type="s:string" />
        <wsdl:part name="shouldCalculateCensus" type="s:string" />
        <wsdl:part name="censusYear" type="s:string" />
        <wsdl:part name="shouldReturnReferenceGeometry" type="s:string" />
        <wsdl:part name="shouldNotStoreTransactionDetails" type="s:string" />
    </wsdl:message>
    <wsdl:message name="GeocodeAddressParsedHttpGetOut">
        <wsdl:part name="Body" element="tns:WebServiceGeocodeQueryResultSet" />
    </wsdl:message>
        </wsdl:definitions > `,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 's',
        prefixFilter: 's:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'https://geoservices.tamu.edu/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),

      elements = builder.getElements(parsedXml, 'wsdl:', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);

    expect(elements).to.be.an('array');

    expect(elements[0].name).to.equal('foobar');
    expect(elements[0].isComplex).to.equal(false);
    expect(elements[0].type).to.equal('integer');
    expect(elements[0].maxOccurs).to.equal('1');
    expect(elements[0].namespace).to.equal('https://geoservices.tamu.edu/');
    expect(elements[0].children).to.be.an('array');
    expect(elements[0].children).to.be.empty;
    expect(elements[0].enumValues).to.have.members(['1',
      '1011',
      '1032'
    ]);

    expect(elements[1].name).to.equal('GeocodeAddressParsedHttpGetIn');
    expect(elements[1].isComplex).to.equal(true);
    expect(elements[1].type).to.equal('anonimous');
    expect(elements[1].children).to.be.an('array');
    expect(elements[1].children.length).to.equal(22);
  });

  it('should get an array of elements defined in the message when all are knowntypes from xsd', function() {
    const simpleInput = `<?xml version="1.0" encoding="UTF-8"?>
      <wsdl:definitions xmlns="http://schemas.xmlsoap.org/wsdl/" 
      xmlns:s="http://www.w3.org/2001/XMLSchema" 
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
      xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
      xmlns:tns="http://www.dataaccess.com/webservicesserver/" 
      name="NumberConversion" targetNamespace="https://geoservices.tamu.edu/">
        <wsdl:types>
        <s:schema elementFormDefault="qualified" targetNamespace="https://geoservices.tamu.edu/" 
        xmlns:s="http://www.w3.org/2001/XMLSchema"
        xmlns:tns="https://geoservices.tamu.edu/">
        <s:element name="foobar" type="enumType"/>
        <s:simpleType name="enumType">
        <s:restriction base="s:integer">
          <s:enumeration value="1"/>
          <s:enumeration value="1011"/>
          <s:enumeration value="1032"/>
        </s:restriction>
        </s:simpleType>
       </s:schema>
        </wsdl:types> 
        <wsdl:message name="GeocodeAddressParsedHttpGetIn">
        <wsdl:part name="number" type="s:decimal" />
        <wsdl:part name="numberFractional" type="s:float" />
        <wsdl:part name="preDirectional" type="s:double" />
        <wsdl:part name="preQualifier" type="s:int" />
        <wsdl:part name="preType" type="s:long" />
        <wsdl:part name="preArticle" type="s:short" />
        <wsdl:part name="name" type="s:unsignedInt" />
        <wsdl:part name="suffix" type="s:unsignedLong" />
        <wsdl:part name="postArticle" type="s:unsignedShort" />
    </wsdl:message>
    <wsdl:message name="GeocodeAddressParsedHttpGetOut">
        <wsdl:part name="Body" element="tns:WebServiceGeocodeQueryResultSet" />
    </wsdl:message>
        </wsdl:definitions > `,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 's',
        prefixFilter: 's:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'https://geoservices.tamu.edu/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),

      elements = builder.getElements(parsedXml, 'wsdl:', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);
    expect(elements).to.be.an('array');

    expect(elements[0].name).to.equal('foobar');
    expect(elements[0].isComplex).to.equal(false);
    expect(elements[0].type).to.equal('integer');
    expect(elements[0].maxOccurs).to.equal('1');
    expect(elements[0].namespace).to.equal('https://geoservices.tamu.edu/');
    expect(elements[0].children).to.be.an('array');
    expect(elements[0].children).to.be.empty;
    expect(elements[0].enumValues).to.have.members(['1',
      '1011',
      '1032'
    ]);

    expect(elements[1].name).to.equal('GeocodeAddressParsedHttpGetIn');
    expect(elements[1].isComplex).to.equal(true);
    expect(elements[1].type).to.equal('anonimous');
    expect(elements[1].children).to.be.an('array');
    expect(elements[1].children.length).to.equal(9);
  });
  it('should get an array of elements defined in the message when have 2 elements', function() {
    const simpleInput = `<definitions xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
    xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" 
    xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" 
    xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" 
    xmlns:tns="http://tempuri.org/" 
    xmlns:s="http://www.w3.org/2001/XMLSchema" 
    xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
    xmlns:http="http://schemas.xmlsoap.org/wsdl/http/" 
    xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" 
    targetNamespace="http://tempuri.org/">
    <types>
        <xsd:schema elementFormDefault="qualified" targetNamespace="http://tempuri.org/">
            <xsd:element name="TestElement">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element minOccurs="0" maxOccurs="1" name="inputString" type="xsd:string" />
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>
            <xsd:element name="TestElementOther">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element minOccurs="0" maxOccurs="1" name="inputStringOther" type="xsd:string" />
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>
        </xsd:schema>
    </types>
    <message name="PO">
        <part name="po" element="tns:TestElement" />
        <part name="invoice" element="tns:TestElementOther" />
    </message>
</definitions>
`,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xsd',
        prefixFilter: 'xsd:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://tempuri.org/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),

      elements = builder.getElements(parsedXml, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);

    expect(elements).to.be.an('array');
    expect(elements[0].name).to.equal('TestElement');
    expect(elements[0].isComplex).to.equal(true);
    expect(elements[1].name).to.equal('TestElementOther');
    expect(elements[1].isComplex).to.equal(true);
    expect(elements[2].name).to.equal('PO');
    expect(elements[2].isComplex).to.equal(true);
    expect(elements[2].type).to.equal('anonimous');
    expect(elements[2].children).to.be.an('array');
    expect(elements[2].children.length).to.equal(2);

  });

  it('should get an array of elements defined in the message when have 2 types', function() {
    const simpleInput = `<definitions xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" 
    xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" 
    xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" 
    xmlns:mime="http://schemas.xmlsoap.org/wsdl/mime/" 
    xmlns:tns="http://tempuri.org/" 
    xmlns:s="http://www.w3.org/2001/XMLSchema" 
    xmlns:soap12="http://schemas.xmlsoap.org/wsdl/soap12/" 
    xmlns:http="http://schemas.xmlsoap.org/wsdl/http/" 
    xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" 
    targetNamespace="http://tempuri.org/">
    <types>
        <xsd:schema elementFormDefault="qualified" targetNamespace="http://tempuri.org/">
        <xsd:simpleType name="enumType">
          <xsd:restriction base="xsd:integer">
            <xsd:enumeration value="1"/>
            <xsd:enumeration value="1011"/>
            <xsd:enumeration value="1032"/>
          </xsd:restriction>
        </xsd:simpleType>
        <xsd:complexType name="MyCustomModel">
          <xsd:sequence>
            <xsd:element minOccurs="1" maxOccurs="1" name="Id" type="xsd:int" />
            <xsd:element minOccurs="0" maxOccurs="1" name="Name" type="xsd:string" />
            <xsd:element minOccurs="0" maxOccurs="1" name="Email" type="xsd:string" />
          </xsd:sequence>
        </xsd:complexType>
        </xsd:schema>
    </types>
    <message name="PO">
        <part name="po" type="tns:enumType" />
        <part name="invoice" type="tns:MyCustomModel" />
    </message>
</definitions>
`,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xsd',
        prefixFilter: 'xsd:',
        url: 'http://www.w3.org/2001/XMLSchema',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://tempuri.org/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),

      elements = builder.getElements(parsedXml, '', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);

    expect(elements).to.be.an('array');
    expect(elements[0].name).to.equal('PO');
    expect(elements[0].isComplex).to.equal(true);
    expect(elements[0].type).to.equal('anonimous');
    expect(elements[0].children[0].name).to.equal('enumType');
    expect(elements[0].children[1].name).to.equal('MyCustomModel');

  });

  it('amazon', function() {
    const simpleInput = `<wsdl:definitions xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:wsa="http://www.w3.org/2005/08/addressing" xmlns:wsp="http://schemas.xmlsoap.org/ws/2004/09/policy" xmlns:wsap="http://schemas.xmlsoap.org/ws/2004/08/addressing/policy" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd" xmlns:tns="http://queue.amazonaws.com/doc/2009-02-01/" targetNamespace="http://queue.amazonaws.com/doc/2009-02-01/">
    <wsdl:types>
        <xs:schema xmlns:tns="http://queue.amazonaws.com/doc/2009-02-01/" targetNamespace="http://queue.amazonaws.com/doc/2009-02-01/" elementFormDefault="qualified">
            <!--  **************************** QueueService Interface ***************************  -->
            <!--  CreateQueue Action  -->
            <xs:element name="CreateQueue">
                <xs:annotation>
                    <xs:documentation xml:lang="en"> The CreateQueue action creates a new queue, or returns the URL of an existing one. When you request CreateQueue, you provide a name for the queue. To successfully create a new queue, you must provide a name that is unique within the scope of your own queues. If you provide the name of an existing queue, a new queue isn't created and an error isn't returned. Instead, the request succeeds and the queue URL for the existing queue is returned. Exception: if you provide a value for DefaultVisibilityTimeout that is different from the value for the existing queue, you receive an error. </xs:documentation>
                </xs:annotation>
                <xs:complexType>
                    <xs:sequence>
                        <xs:element name="QueueName" type="xs:string" />
                        <xs:element name="DefaultVisibilityTimeout" type="xs:integer" minOccurs="0" />
                        <xs:element ref="tns:Attribute" minOccurs="0" maxOccurs="unbounded" />
                    </xs:sequence>
                </xs:complexType>
            </xs:element>
            <!--  CreateQueue Action Response  -->
            <xs:element name="CreateQueueResponse">
                <xs:complexType>
                    <xs:sequence>
                        <xs:element ref="tns:CreateQueueResult" />
                        <xs:element ref="tns:ResponseMetadata" />
                    </xs:sequence>
                </xs:complexType>
            </xs:element>
            <xs:element name="CreateQueueResult">
                <xs:complexType>
                    <xs:sequence>
                        <xs:element name="QueueUrl" type="xs:anyURI" />
                    </xs:sequence>
                </xs:complexType>
            </xs:element>
                        <xs:element name="ResponseMetadata">
                <xs:complexType>
                    <xs:sequence>
                        <xs:element name="RequestId" type="xs:string" />
                    </xs:sequence>
                </xs:complexType>
            </xs:element>
        </xs:schema>
    </wsdl:types>
    <!--  ******************************** Messages *********************************  -->
    <wsdl:message name="CreateQueueRequestMsg">
        <wsdl:part name="body" element="tns:CreateQueue" />
    </wsdl:message>
    <wsdl:message name="CreateQueueResponseMsg">
        <wsdl:part name="body" element="tns:CreateQueueResponse" />
    </wsdl:message>
    <!--  ********************************* Ports ***********************************  -->
    <wsdl:portType name="QueueServicePortType">
        <wsdl:operation name="CreateQueue">
            <wsdl:documentation> The CreateQueue action creates a new queue, or returns the URL of an existing one. When you request CreateQueue, you provide a name for the queue. To successfully create a new queue, you must provide a name that is unique within the scope of your own queues. If you provide the name of an existing queue, a new queue isn't created and an error isn't returned. Instead, the request succeeds and the queue URL for the existing queue is returned. Exception: if you provide a value for DefaultVisibilityTimeout that is different from the value for the existing queue, you receive an error. </wsdl:documentation>
            <wsdl:input message="tns:CreateQueueRequestMsg" wsa:Action="urn:CreateQueue" />
            <wsdl:output message="tns:CreateQueueResponseMsg" wsa:Action="urn:CreateQueue:Response" />
        </wsdl:operation>
    </wsdl:portType>
    
    <!--  ******************************** Bindings **********************************  -->
    <wsdl:binding name="QueueServiceBinding" type="tns:QueueServicePortType">
        <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http" />
        <wsdl:operation name="CreateQueue">
            <soap:operation soapAction="CreateQueue" />
            <wsdl:input>
                <soap:body use="literal" />
            </wsdl:input>
            <wsdl:output>
                <soap:body use="literal" />
            </wsdl:output>
        </wsdl:operation>
    </wsdl:binding>
    
    <!--  ******************************** Service **********************************  -->
    <wsdl:service name="QueueService">
        <wsdl:documentation> Amazon Simple Queue Service (Amazon SQS) offers a reliable, highly scalable hosted queue for storing messages as they travel between computers. By using Amazon SQS, developers can simply move data between distributed application components performing different tasks, without losing messages or requiring each component to be always available. Amazon SQS works by exposing Amazon's web-scale messaging infrastructure as a web service. Any computer on the Internet can add or read messages without any installed software or special firewall configurations. Components of applications using Amazon SQS can run independently, and do not need to be on the same network, developed with the same technologies, or running at the same time. </wsdl:documentation>
        <wsdl:port name="QueueServicePort" binding="tns:QueueServiceBinding">
            <soap:address location="http://queue.amazonaws.com" />
        </wsdl:port>
    </wsdl:service>
</wsdl:definitions>
`,
      parser = new Wsdl11Parser(),
      schemaNameSpace = {
        key: 'xs',
        prefixFilter: 'xs:',
        url: 'http://queue.amazonaws.com/doc/2009-02-01/',
        isDefault: false
      },
      thisNameSpace = {
        key: 'tns',
        prefixFilter: 'tns:',
        url: 'http://queue.amazonaws.com/doc/2009-02-01/',
        isDefault: false
      },
      builder = new SchemaBuilderXSD();
    let parsedXml = parser.parseFromXmlToObject(simpleInput),

      elements = builder.getElements(parsedXml, 'wsdl:', 'definitions', schemaNameSpace, thisNameSpace,
        PARSER_ATRIBUTE_NAME_PLACE_HOLDER);

    expect(elements).to.be.an('array');
    expect(elements[0].name).to.equal('CreateQueueResult');
    expect(elements[0].isComplex).to.equal(true);
    expect(elements[0].type).to.equal('complex');
    expect(elements[0].children[0].name).to.equal('QueueUrl');
    expect(elements[0].children[0].type).to.equal('string');

    expect(elements[2].name).to.equal('CreateQueueResponse');
    expect(elements[2].type).to.equal('complex');
    expect(elements[2].children[0].name).to.equal('CreateQueueResult');
    expect(elements[2].children[0].isComplex).to.equal(true);
    expect(elements[2].children[0].children[0].name).to.equal('QueueUrl');
    expect(elements[2].children[0].children[0].type).to.equal('string');

  });

});


describe('SchemaBuilderXSD parseObjectToXML', function() {
  it('should get an error when the object sent is undefined', function() {
    const builder = new SchemaBuilderXSD();
    try {
      builder.parseObjectToXML(undefined);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Cannot convert undefined or null to xml');
    }
  });
  it('should get an error when the object sent is null', function() {
    const builder = new SchemaBuilderXSD();
    try {
      builder.parseObjectToXML(null);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Cannot convert undefined or null to xml');
    }
  });
});

describe('SchemaBuilderXSD getElementsFromType', function() {
  it('should get an error when the object sent is undefined', function() {
    const builder = new SchemaBuilderXSD();
    try {
      builder.getElementsFromType('', null, '', '', PARSER_ATRIBUTE_NAME_PLACE_HOLDER);
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get elements from undefined or null object');
    }
  });
});

describe('SchemaBuilderXSD getTypes', function() {
  it('should get an error when the object sent is undefined', function() {
    const builder = new SchemaBuilderXSD();
    try {
      builder.getTypes(null, '', '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get types from undefined or null object');
    }
  });

  it('should get an error when the object sent is empty object', function() {
    const builder = new SchemaBuilderXSD();
    try {
      builder.getTypes({}, '', '');
      assert.fail('we expected an error');
    }
    catch (error) {
      expect(error.message).to.equal('Can not get types from object');
    }
  });
});


describe('replaceTagInSchema', function() {
  const xml = `
    <xsd:schema targetNamespace=“http://www.profixio.com/soap/services/getActivityByUser.php”>
      <xsd:element name=“getActivityByUser”>
          <xsd:complexType>
              <xsd:sequence>
                  <xsd:element name=“application_key” type=“xsd:string”/>
                  <xsd:element name=“association” type=“xsd:string” nillable=“true”/>
                  <xsd:element name=“username” type=“xsd:string” nillable=“true”/>
                  <xsd:element name=“password” type=“xsd:string” nillable=“true”/>
                  <xsd:element name=“role” type=“xsd:string” nillable=“true”/>
                  <xsd:element name=“fromWeekNbr” type=“xsd:string” nillable=“true”/>
                  <xsd:element name=“toWeekNbr” type=“xsd:string” nillable=“true”/>
                  <xsd:element name=“fromDate” type=“xsd:date” nillable=“true”/>
                  <xsd:element name=“toDate” type=“xsd:date” nillable=“true”/>
              </xsd:sequence>
          </xsd:complexType>
      </xsd:element>
      <xsd:complexType name=“userActivity”>
          <xsd:all>
              <xsd:element name=“activityID” type=“xsd:int” nillable=“true”/>
              <xsd:element name=“registrationStatus” type=“xsd:int” nillable=“true”/>
              <xsd:element name=“registrationStatusText” type=“xsd:int” nillable=“true”/>
              <xsd:element name=“singleSession” type=“xsd:int” nillable=“true”/>
              <xsd:element name=“singleSessionDate” type=“xsd:string” nillable=“true”/>
          </xsd:all>
      </xsd:complexType>
      <xsd:complexType name=“ArrayOfUserActivity”>
          <xsd:sequence>
              <xsd:element name=“item” type=“tns:userActivity” minOccurs=“0" maxOccurs=“unbounded”/>
          </xsd:sequence>
      </xsd:complexType>
      <xsd:element name=“getActivityByUserResponse”>
          <xsd:complexType>
              <xsd:sequence>
                  <xsd:element name=“getActivityByUserResult” type=“tns:ArrayOfUserActivity”/>
              </xsd:sequence>
          </xsd:complexType>
      </xsd:element>
    </xsd:schema>
    `,
    schemaNameSpace = {
      key: 'xsd',
      prefixFilter: 'xsd:',
      url: 'http://www.w3.org/2001/XMLSchema',
      isDefault: false
    };

  it('Should switch all tags in document with sequence tags', function() {
    const schemaBuilder = new SchemaBuilderXSD(),
      result = schemaBuilder.replaceTagInSchema(xml, schemaNameSpace, 'all', 'sequence');
    expect(result.includes('<xsd:all>')).to.equal(false);
  });
});
