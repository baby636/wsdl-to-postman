const numberToWordsWSDLObject = require('./../data/transactionsValidation/wsdlObjects/numberToWords'),
  calculatorWSDLObject = require('./../data/transactionsValidation/wsdlObjects/calculator'),
  numberToWordsCollectionItemsPMVariable =
    require('./../data/transactionsValidation/numberToWordsCollectionItemsPMVariable.json'),
  calculatorCollectionItemsPMVariable =
    require('./../data/transactionsValidation/calculatorCollectionItemsPMVariable.json'),
  numberToWordsCollectionItemsBodyMoreFields =
    require('./../data/transactionsValidation/numberToWordsCollectionItemsBodyMoreFields.json'),
  numberToWordsCollectionItemsBodyIncomplete =
    require('./../data/transactionsValidation/numberToWordsCollectionItemsBodyIncomplete.json'),
  numberToWordsCollectionItemsBodyWrongType =
    require('./../data/transactionsValidation/numberToWordsCollectionItemsBodyWrongType.json'),
  {
    expect
  } = require('chai'),
  {
    TransactionValidator
  } = require('./../../lib/TransactionValidator'),
  {
    XMLParser
  } = require('../../lib/XMLParser'),
  numberToWordsCollectionItemsCTHeaderPMVariable =
    require('./../data/transactionsValidation/numberToWordsCollectionItemsCTHeaderPMVariable.json'),
  expectedBase = {
    matched: true,
    requests: {
      '18403328-4213-4c3e-b0e9-b21a636697c3': {
        endpoints: [{
          matched: true,
          endpointMatchScore: 1,
          endpoint: 'POST soap12 NumberToDollars',
          mismatches: [],
          responses: {
            '1763f0b2-9f34-4796-a390-b94ee5c37c7c': {
              id: '1763f0b2-9f34-4796-a390-b94ee5c37c7c',
              matched: true,
              mismatches: []
            }
          }
        }],
        requestId: '18403328-4213-4c3e-b0e9-b21a636697c3'
      },
      '353e33da-1eee-41c1-8865-0f72b2e1fd10': {
        endpoints: [{
          matched: true,
          endpointMatchScore: 1,
          endpoint: 'POST soap12 NumberToWords',
          mismatches: [],
          responses: {
            'c8a892b6-4b2e-4523-9cc3-fc3e08c835c4': {
              id: 'c8a892b6-4b2e-4523-9cc3-fc3e08c835c4',
              matched: true,
              mismatches: []
            }
          }
        }],
        requestId: '353e33da-1eee-41c1-8865-0f72b2e1fd10'
      },
      '395c9db6-d6f5-45a7-90f5-09f5aab4fe92': {
        endpoints: [{
          matched: true,
          endpointMatchScore: 1,
          endpoint: 'POST soap NumberToDollars',
          mismatches: [],
          responses: {
            '8a0c6532-84f9-45c7-838a-f4bf1a6de002': {
              id: '8a0c6532-84f9-45c7-838a-f4bf1a6de002',
              matched: true,
              mismatches: []
            }
          }
        }],
        requestId: '395c9db6-d6f5-45a7-90f5-09f5aab4fe92'
      },
      'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0': {
        endpoints: [{
          matched: true,
          endpointMatchScore: 1,
          endpoint: 'POST soap NumberToWords',
          mismatches: [],
          responses: {
            'd36c56cf-0cf6-4273-a34d-973e842bf80f': {
              id: 'd36c56cf-0cf6-4273-a34d-973e842bf80f',
              matched: true,
              mismatches: []
            }
          }
        }],
        requestId: 'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0'
      }
    }
  },
  expectedCalculatorBase = {
    matched: true,
    requests: {
      'd15dbad2-a5d2-4c96-9a9c-5f794d3eba01': {
        requestId: 'd15dbad2-a5d2-4c96-9a9c-5f794d3eba01',
        endpoints: [
          {
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap Add',
            mismatches: [
            ],
            responses: {
              '0b710935-f1f7-4048-9ea8-ce829a477eab': {
                id: '0b710935-f1f7-4048-9ea8-ce829a477eab',
                matched: true,
                mismatches: [
                ]
              }
            }
          }
        ]
      },
      '96552d2b-2877-4cf1-ac6d-33846c17abd2': {
        requestId: '96552d2b-2877-4cf1-ac6d-33846c17abd2',
        endpoints: [
          {
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap Subtract',
            mismatches: [
            ],
            responses: {
              '4f1d0f6c-65ed-4302-babc-a46ce2134ac3': {
                id: '4f1d0f6c-65ed-4302-babc-a46ce2134ac3',
                matched: true,
                mismatches: [
                ]
              }
            }
          }
        ]
      },
      'afe6f424-c8d3-4f22-ac7f-68fd7227a486': {
        requestId: 'afe6f424-c8d3-4f22-ac7f-68fd7227a486',
        endpoints: [
          {
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap Multiply',
            mismatches: [
            ],
            responses: {
              'ca88bea9-ba25-43ff-8992-5478e8b22a3c': {
                id: 'ca88bea9-ba25-43ff-8992-5478e8b22a3c',
                matched: true,
                mismatches: [
                ]
              }
            }
          }
        ]
      },
      'd724b317-5f53-451b-a5ce-6ee112034159': {
        requestId: 'd724b317-5f53-451b-a5ce-6ee112034159',
        endpoints: [
          {
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap Divide',
            mismatches: [
            ],
            responses: {
              '77c8ddce-e038-450d-b62b-e6eddd8c35e3': {
                id: '77c8ddce-e038-450d-b62b-e6eddd8c35e3',
                matched: true,
                mismatches: [
                ]
              }
            }
          }
        ]
      },
      '97a39497-046f-4070-acac-c74f56e25a12': {
        requestId: '97a39497-046f-4070-acac-c74f56e25a12',
        endpoints: [
          {
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap12 Add',
            mismatches: [
            ],
            responses: {
              '1e031046-c0f0-43a2-86be-73fe40232125': {
                id: '1e031046-c0f0-43a2-86be-73fe40232125',
                matched: true,
                mismatches: [
                ]
              }
            }
          }
        ]
      },
      '345a134b-4a5b-491a-9e44-e2e8248571bc': {
        requestId: '345a134b-4a5b-491a-9e44-e2e8248571bc',
        endpoints: [
          {
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap12 Subtract',
            mismatches: [
            ],
            responses: {
              'b9b97647-8277-4a33-81fc-49c1d6d64761': {
                id: 'b9b97647-8277-4a33-81fc-49c1d6d64761',
                matched: true,
                mismatches: [
                ]
              }
            }
          }
        ]
      },
      'd0c1ac21-2949-4f62-ad09-daa10cf608ef': {
        requestId: 'd0c1ac21-2949-4f62-ad09-daa10cf608ef',
        endpoints: [
          {
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap12 Multiply',
            mismatches: [
            ],
            responses: {
              '0bd70547-189b-47e2-969d-44d04423224e': {
                id: '0bd70547-189b-47e2-969d-44d04423224e',
                matched: true,
                mismatches: [
                ]
              }
            }
          }
        ]
      },
      '1a4fd56b-1260-4861-9483-7724b46a27c2': {
        requestId: '1a4fd56b-1260-4861-9483-7724b46a27c2',
        endpoints: [
          {
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap12 Divide',
            mismatches: [
            ],
            responses: {
              '7c690fc8-cad3-4a7f-aa7f-9b98a03a3c4b': {
                id: '7c690fc8-cad3-4a7f-aa7f-9b98a03a3c4b',
                matched: true,
                mismatches: [
                ]
              }
            }
          }
        ]
      }
    },
    missingEndpoints: [
    ]
  };

describe('validateBody method with options', function () {
  const bodyMismatchMockWithReason = (reason, schemaJsonPath, reasonCode = 'INVALID_BODY') => {
      let newMismatch = Object.assign(
        {},
        {
          property: 'BODY',
          transactionJsonPath: '$.request.body',
          schemaJsonPath: schemaJsonPath,
          reasonCode,
          reason: reason
        }
      );
      return newMismatch;
    },
    getExpectedWithMismatchInEndpoint = (expectedBase, itemId, mismatch, type = 'request') => {
      let newExpected = JSON.parse(JSON.stringify(expectedBase));
      if (type === 'request') {
        newExpected.matched = false;
        newExpected.requests[itemId].endpoints[0].mismatches = Array.isArray(mismatch) ? mismatch : [mismatch];
        newExpected.requests[itemId].endpoints[0].matched = false;
      }
      else if (type === 'response') {
        newExpected.matched = false;
        newExpected.requests[itemId].endpoints[0].mismatches = Array.isArray(mismatch) ? mismatch : [mismatch];
        newExpected.requests[itemId].endpoints[0].matched = false;
      }
      return newExpected;
    },
    withSuggestedFix = (mismatch, suggestedObject) => {
      let newMismatch = JSON.parse(JSON.stringify(mismatch));
      newMismatch.suggestedFix = suggestedObject;
      return newMismatch;
    };
  it('Should have a mismatch when a request msg has an unresolved PM variable no option sent', function () {
    const transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(
        numberToWordsCollectionItemsPMVariable,
        numberToWordsWSDLObject, new XMLParser(),
        { detailedBlobValidation: true }
      ),
      mismatchReason =
        'Element \'ubiNum\': \'{{pmVariable}}\' is not a valid value of the atomic type \'xs:unsignedLong\'.\n',
      expected = getExpectedWithMismatchInEndpoint(
        expectedBase,
        'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0',
        bodyMismatchMockWithReason(mismatchReason, '//definitions//binding[@name="NumberConversionSoapBinding"]' +
          '//operation[@name="NumberToWords"]')
      );
    expect(result).to.be.an('object').and.to.deep.include(expected);
  });

  it('Should have a mismatch when request msg has an unresolved PM variable and ignoreUnresolvedVariables is false',
    function () {
      const transactionValidator = new TransactionValidator(),
        result = transactionValidator.validateTransaction(
          numberToWordsCollectionItemsPMVariable,
          numberToWordsWSDLObject, new XMLParser(),
          { ignoreUnresolvedVariables: false, detailedBlobValidation: true }
        ),
        mismatchReason =
          'Element \'ubiNum\': \'{{pmVariable}}\' is not a valid value of the atomic type \'xs:unsignedLong\'.\n',
        expected = getExpectedWithMismatchInEndpoint(
          expectedBase,
          'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0',
          bodyMismatchMockWithReason(mismatchReason, '//definitions//binding[@name="NumberConversionSoapBinding"]' +
            '//operation[@name="NumberToWords"]')
        );
      expect(result).to.be.an('object').and.to.deep.include(expected);
    });


  it('Shouldn\'t have a mismatch when a request msg has an unresolved PM variable' +
  ' and ignoreUnresolvedVariables is true', function () {
    const transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(
        numberToWordsCollectionItemsPMVariable,
        numberToWordsWSDLObject, new XMLParser(),
        { ignoreUnresolvedVariables: true }
      );
    expect(result).to.be.an('object').and.to.deep.include(expectedBase);
  });

  it('Should have a mismatch when a request msg has 2 unresolved PM variable no option sent', function () {
    const transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(
        calculatorCollectionItemsPMVariable,
        calculatorWSDLObject, new XMLParser(),
        { detailedBlobValidation: true }
      ),
      mismatchReason =
        'Element \'intA\': \'{{}}\' is not a valid value of the atomic type \'xs:int\'.\n',
      mismatchReason2 =
        'Element \'intB\': \'{{}}\' is not a valid value of the atomic type \'xs:int\'.\n',
      mock1 = bodyMismatchMockWithReason(mismatchReason, '//definitions//binding[@name="CalculatorSoap"]' +
        '//operation[@name="Subtract"]'),
      mock2 = bodyMismatchMockWithReason(mismatchReason2, '//definitions//binding[@name="CalculatorSoap"]' +
        '//operation[@name="Subtract"]'),
      expected = getExpectedWithMismatchInEndpoint(
        expectedCalculatorBase,
        '96552d2b-2877-4cf1-ac6d-33846c17abd2',
        [mock1, mock2]);
    expect(result).to.be.an('object').and.to.deep.include(expected);
  });

  it('Shouldn\'t have a mismatch when a request msg has 2 unresolved PM variable and ignoreUnresolvedVariables is true',
    function () {
      const transactionValidator = new TransactionValidator(),
        result = transactionValidator.validateTransaction(
          calculatorCollectionItemsPMVariable,
          calculatorWSDLObject, new XMLParser(),
          { ignoreUnresolvedVariables: true }
        );
      expect(result).to.be.an('object').and.to.deep.include(expectedCalculatorBase);
    });

  it('Should have a mismatch when a request msg has more than expected fields and ' +
  'showMissingSchemaErrors is not sent', function () {
    const transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(
        numberToWordsCollectionItemsBodyMoreFields,
        numberToWordsWSDLObject, new XMLParser(),
        { detailedBlobValidation: true }
      ),
      mismatchReason = 'Element \'WORNGFIELD\': This element is not expected.\n',
      expected = getExpectedWithMismatchInEndpoint(
        expectedBase,
        'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0',
        bodyMismatchMockWithReason(mismatchReason, '//definitions//binding[@name="NumberConversionSoapBinding"]' +
          '//operation[@name="NumberToWords"]')
      );
    expect(result).to.be.an('object').and.to.deep.include(expected);
  });

  it('Shouldn\'t have any mismatch when a request msg has more than expected fields' +
  ' and showMissingSchemaErrors is false',
  function () {
    const transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(
        numberToWordsCollectionItemsBodyMoreFields,
        numberToWordsWSDLObject, new XMLParser(),
        { showMissingSchemaErrors: false }
      );
    expect(result).to.be.an('object').and.to.deep.include(expectedBase);
  });

  it('Should have a mismatch when a request msg has more than expected fields and showMissingSchemaErrors is true',
    function () {
      const transactionValidator = new TransactionValidator(),
        result = transactionValidator.validateTransaction(
          numberToWordsCollectionItemsBodyMoreFields,
          numberToWordsWSDLObject, new XMLParser(),
          { detailedBlobValidation: true }
        ),
        mismatchReason = 'Element \'WORNGFIELD\': This element is not expected.\n',
        expected = getExpectedWithMismatchInEndpoint(
          expectedBase,
          'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0',
          bodyMismatchMockWithReason(mismatchReason, '//definitions//binding[@name="NumberConversionSoapBinding"]' +
            '//operation[@name="NumberToWords"]')
        );
      expect(result).to.be.an('object').and.to.deep.include(expected);
    });

  it('Should have a mismatch when a request msg has more than expected fields, showMissingSchemaErrors is true' +
  ' and suggestAvaulableFixes is true',
  function () {
    const transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(
        numberToWordsCollectionItemsBodyMoreFields,
        numberToWordsWSDLObject, new XMLParser(),
        { showMissingSchemaErrors: true, suggestAvailableFixes: true }
      ),
      mismatchReason = 'The request body didn\'t match the specified schema',
      expected = getExpectedWithMismatchInEndpoint(
        expectedBase,
        'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0',
        withSuggestedFix(
          bodyMismatchMockWithReason(mismatchReason, '//definitions//binding[@name="NumberConversionSoapBinding"]' +
          '//operation[@name="NumberToWords"]'),
          {
            key: 'body',
            actualValue: '<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope' +
              ' xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n' +
              '    <NumberToWords xmlns=\"http://www.dataaccess.com/webservicesserver/\">\n' +
              '      <ubiNum>18446744073709</ubiNum>\n <WORNGFIELD>WRONG</WORNGFIELD>\n' +
              '    </NumberToWords>\n  </soap:Body>\n</soap:Envelope>\n',
            suggestedValue: '<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<soap:Envelope' +
              ' xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n  <soap:Body>\n' +
              '    <NumberToWords xmlns=\"http://www.dataaccess.com/webservicesserver/\">\n' +
              '      <ubiNum>100</ubiNum>\n    </NumberToWords>\n  </soap:Body>\n</soap:Envelope>\n'
          }
        )
      );
    expect(result).to.be.an('object').and.to.deep.include(expected);
  });

  it('Should have a mismatch when a request msg has more than expected fields, showMissingSchemaErrors is true,' +
  ' suggestAvaulableFixes is true and detailedBlobValidation is true',
  function () {
    const transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(
        numberToWordsCollectionItemsBodyMoreFields,
        numberToWordsWSDLObject, new XMLParser(),
        {
          showMissingSchemaErrors: true,
          suggestAvailableFixes: true,
          detailedBlobValidation: true
        }
      ),
      mismatchReason = 'Element \'WORNGFIELD\': This element is not expected.\n',
      expected = getExpectedWithMismatchInEndpoint(
        expectedBase,
        'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0',
        withSuggestedFix(
          bodyMismatchMockWithReason(
            mismatchReason,
            '//definitions//binding[@name="NumberConversionSoapBinding"]' +
            '//operation[@name="NumberToWords"]',
            'MISSING_IN_SCHEMA'
          ),
          {
            key: 'WORNGFIELD',
            actualValue: ' <WORNGFIELD>WRONG</WORNGFIELD>',
            suggestedValue: ''
          }
        )
      );
    expect(result).to.be.an('object').and.to.deep.include(expected);
  });

  it('Should have a mismatch when a request msg has less than expected fields,' +
  ' suggestAvaulableFixes is true and detailedBlobValidation is true',
  function () {
    const transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(
        numberToWordsCollectionItemsBodyIncomplete,
        numberToWordsWSDLObject, new XMLParser(),
        {
          suggestAvailableFixes: true,
          detailedBlobValidation: true
        }
      ),
      mismatchReason = 'Element \'NumberToWords\': Missing child element(s). Expected is ( ubiNum ).\n',
      expected = getExpectedWithMismatchInEndpoint(
        expectedBase,
        'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0',
        withSuggestedFix(
          bodyMismatchMockWithReason(
            mismatchReason,
            '//definitions//binding[@name="NumberConversionSoapBinding"]' +
            '//operation[@name="NumberToWords"]',
            'MISSING_IN_REQUEST'
          ),
          {
            key: 'NumberToWords',
            actualValue: '',
            suggestedValue: '      <ubiNum>100</ubiNum>'
          }
        )
      );
    expect(result).to.be.an('object').and.to.deep.include(expected);
  });

  it('Should have a mismatch when a request msg has a different type than expected in field,' +
  ' suggestAvaulableFixes is true and detailedBlobValidation is true',
  function () {
    const transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(
        numberToWordsCollectionItemsBodyWrongType,
        numberToWordsWSDLObject, new XMLParser(),
        {
          suggestAvailableFixes: true,
          detailedBlobValidation: true
        }
      ),
      mismatchReason = 'Element \'ubiNum\': \'WRONG TYPE\' is not a valid' +
        ' value of the atomic type \'xs:unsignedLong\'.\n',
      expected = getExpectedWithMismatchInEndpoint(
        expectedBase,
        'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0',
        withSuggestedFix(
          bodyMismatchMockWithReason(
            mismatchReason,
            '//definitions//binding[@name="NumberConversionSoapBinding"]' +
            '//operation[@name="NumberToWords"]',
            'INVALID_TYPE'
          ),
          {
            key: 'ubiNum',
            actualValue: '      <ubiNum>WRONG TYPE</ubiNum>',
            suggestedValue: '      <ubiNum>100</ubiNum>'
          }
        )
      );
    expect(result).to.be.an('object').and.to.deep.include(expected);
  });

});

describe('Validate Headers with options', function () {

  it('Should return bad header mismatch when validateContentType option' +
    ' is true content-type header is not text/xml and ignore unresolved variables is false', function () {
    const options = {
        validateContentType: true,
        ignoreUnresolvedVariables: false
      },
      transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(numberToWordsCollectionItemsCTHeaderPMVariable,
        numberToWordsWSDLObject, new XMLParser(), options);
    expect(result).to.be.an('object').and.to.deep.include({
      matched: false,
      requests: {
        '18403328-4213-4c3e-b0e9-b21a636697c3': {
          endpoints: [{
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap12 NumberToDollars',
            mismatches: [],
            responses: {
              '1763f0b2-9f34-4796-a390-b94ee5c37c7c': {
                id: '1763f0b2-9f34-4796-a390-b94ee5c37c7c',
                matched: true,
                mismatches: []
              }
            }
          }],
          requestId: '18403328-4213-4c3e-b0e9-b21a636697c3'
        },
        '353e33da-1eee-41c1-8865-0f72b2e1fd10': {
          endpoints: [{
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap12 NumberToWords',
            mismatches: [],
            responses: {
              'c8a892b6-4b2e-4523-9cc3-fc3e08c835c4': {
                id: 'c8a892b6-4b2e-4523-9cc3-fc3e08c835c4',
                matched: true,
                mismatches: []
              }
            }
          }],
          requestId: '353e33da-1eee-41c1-8865-0f72b2e1fd10'
        },
        '395c9db6-d6f5-45a7-90f5-09f5aab4fe92': {
          endpoints: [{
            matched: true,
            endpointMatchScore: 1,
            endpoint: 'POST soap NumberToDollars',
            mismatches: [],
            responses: {
              '8a0c6532-84f9-45c7-838a-f4bf1a6de002': {
                id: '8a0c6532-84f9-45c7-838a-f4bf1a6de002',
                matched: true,
                mismatches: []
              }
            }
          }],
          requestId: '395c9db6-d6f5-45a7-90f5-09f5aab4fe92'
        },
        'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0': {
          endpoints: [{
            matched: false,
            endpointMatchScore: 1,
            endpoint: 'POST soap NumberToWords',
            mismatches: [{
              property: 'HEADER',
              transactionJsonPath: '$.request.header[0].value',
              schemaJsonPath: 'schemaPathPrefix',
              reasonCode: 'INVALID_TYPE',
              reason: 'The header \"Content-Type\" needs to be \"text/xml\" but we ' +
                'found \"{{unresolvedVariable}}\" instead'
            }],
            responses: {
              'd36c56cf-0cf6-4273-a34d-973e842bf80f': {
                id: 'd36c56cf-0cf6-4273-a34d-973e842bf80f',
                matched: false,
                mismatches: [{
                  property: 'HEADER',
                  transactionJsonPath: '$.responses[d36c56cf-0cf6-4273-a34d-973e842bf80f].header[0].value',
                  schemaJsonPath: 'schemaPathPrefix',
                  reasonCode: 'INVALID_TYPE',
                  reason: 'The header \"Content-Type\" needs to be \"text/xml\" but we' +
                    ' found \"{{unresolvedVariable}}\" instead'
                }]
              }
            }
          }],
          requestId: 'aebb36fc-1be3-44c3-8f4a-0b5042dc17d0'
        }
      }
    });
  });

  it('Shouldn\'t have a mismatch when a request msg has an unresolved PM variable' +
    ' and ignoreUnresolvedVariables is true', function () {
    const transactionValidator = new TransactionValidator(),
      result = transactionValidator.validateTransaction(
        numberToWordsCollectionItemsCTHeaderPMVariable,
        numberToWordsWSDLObject, new XMLParser(),
        {
          validateContentType: true,
          ignoreUnresolvedVariables: true
        }
      );
    expect(result).to.be.an('object').and.to.deep.include(expectedBase);
  });
});
