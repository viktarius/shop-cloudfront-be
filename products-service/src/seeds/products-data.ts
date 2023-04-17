import { DynamoDB } from 'aws-sdk';
export const productsData: DynamoDB.Types.BatchWriteItemInput = {
    RequestItems: {
        products: [{
            PutRequest: {
                Item: {
                    'id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80aa' },
                    'title': { S: 'Random laptop' },
                    'description': { S: 'You will get a random laptop in price from $100 to $500' },
                    'price': { N: '299' },
                    'imagePath': { S: '/assets/icons/laptop.svg' }
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a2' },
                    'title': { S: 'Random CPU' },
                    'description': { S: 'You will get a random CPU in price from $100 to $500' },
                    'price': { N: '169' },
                    'imagePath': { S: '/assets/icons/cpu.svg' }
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a3' },
                    'title': { S: 'Random controller' },
                    'description': { S: 'You will get a random controller in price from $50 to $300' },
                    'price': { N: '99' },
                    'imagePath': { S: '/assets/icons/controller.svg' }
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a4' },
                    'title': { S: 'Random keyboard' },
                    'description': { S: 'You will get a random keyboard in price from $50 to $300' },
                    'price': { N: '99' },
                    'imagePath': { S: '/assets/icons/keyboard.svg' }
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a5' },
                    'title': { S: 'Random mouse' },
                    'description': { S: 'You will get a random mouse in price from $100 to $300' },
                    'price': { N: '159' },
                    'imagePath': { S: '/assets/icons/mouse.svg' }
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a6' },
                    'title': { S: 'Random motherboard' },
                    'description': { S: 'You will get a random motherboard in price from $100 to $300' },
                    'price': { N: '159' },
                    'imagePath': { S: '/assets/icons/motherboard.svg' }
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a7' },
                    'title': { S: 'Random RAM' },
                    'description': { S: 'You will get a random RAM in price from $40 to $150' },
                    'price': { N: '79' },
                    'imagePath': { S: '/assets/icons/ram.svg' }
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a8' },
                    'title': { S: 'Random chair' },
                    'description': { S: 'You will get a random chair in price from $20 to $400' },
                    'price': { N: '79' },
                    'imagePath': { S: '/assets/icons/chair.svg' }
                }
            }
        }]
    }
}
