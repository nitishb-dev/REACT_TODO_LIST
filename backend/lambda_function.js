const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "TodoTable";

exports.handler = async (event) => {
    try {
        const httpMethod = event.httpMethod;
        const body = event.body ? JSON.parse(event.body) : {};
        
        switch (httpMethod) {
            case "GET":
                return await getTodos();
            case "POST":
                return await addTodo(body);
            case "PUT":
                return await updateTodo(body);
            case "DELETE":
                return await deleteTodo(body.id);
            default:
                return { statusCode: 400, body: JSON.stringify({ error: "Invalid request method" }) };
        }
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

async function getTodos() {
    const params = {
        TableName: TABLE_NAME
    };
    const data = await dynamoDB.scan(params).promise();
    return { statusCode: 200, body: JSON.stringify(data.Items) };
}

async function addTodo(todo) {
    if (!todo.text || !todo.startDate || !todo.endDate) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing fields" }) };
    }
    const newTodo = {
        id: Date.now().toString(),
        text: todo.text,
        isComplete: false,
        timeAdded: new Date().toISOString(),
        completedTime: null,
        startDate: todo.startDate,
        endDate: todo.endDate
    };
    const params = {
        TableName: TABLE_NAME,
        Item: newTodo
    };
    await dynamoDB.put(params).promise();
    return { statusCode: 201, body: JSON.stringify(newTodo) };
}

async function updateTodo(todo) {
    if (!todo.id) {
        return { statusCode: 400, body: JSON.stringify({ error: "ID is required" }) };
    }
    const params = {
        TableName: TABLE_NAME,
        Key: { id: todo.id },
        UpdateExpression: "set text = :t, startDate = :s, endDate = :e, isComplete = :c, completedTime = :ct",
        ExpressionAttributeValues: {
            ":t": todo.text,
            ":s": todo.startDate,
            ":e": todo.endDate,
            ":c": todo.isComplete,
            ":ct": todo.isComplete ? new Date().toISOString() : null
        },
        ReturnValues: "UPDATED_NEW"
    };
    const updated = await dynamoDB.update(params).promise();
    return { statusCode: 200, body: JSON.stringify(updated.Attributes) };
}

async function deleteTodo(id) {
    if (!id) {
        return { statusCode: 400, body: JSON.stringify({ error: "ID is required" }) };
    }
    const params = {
        TableName: TABLE_NAME,
        Key: { id }
    };
    await dynamoDB.delete(params).promise();
    return { statusCode: 200, body: JSON.stringify({ message: "Todo deleted" }) };
}
