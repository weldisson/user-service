import { DynamoDB } from "aws-sdk";
import { User } from "../../domain/users/Users";

export default class UserRepository {
  private dynamo: DynamoDB.DocumentClient;
  private user_table: string;

  constructor(user_table: string) {
    this.dynamo = new DynamoDB.DocumentClient();
    this.user_table = user_table;
  }

  public async add(user: User) {
    console.log("Adding user in database", user);

    const user_item = {
      ...user,
    };

    const response = await this.dynamo
      .put({
        TableName: this.user_table,
        Item: user,
      })
      .promise();

    this.handle_response(response);
  }

  public async findByEmail(userEmail: string): Promise<User | null> {
    const email = userEmail.trim();

    let params: any = {
      TableName: this.user_table,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    return this.fromParamsToUser(params);
  }

  public async findById(userId: string): Promise<User | null> {
    const params = {
      TableName: this.user_table,
      FilterExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": userId,
      },
    };

    return this.fromParamsToUser(params);
  }

  private handle_response(response: any) {
    if (response.$response.error) {
      console.error(response.$response.error);
      throw new Error("Error in database");
    }

    console.log(`Database returned results: ${JSON.stringify(response)}`);
  }

  private async fromParamsToUser(paramsFrom: any): Promise<User | null> {
    let resultItems: any = [];
    let lastEvaluatedKey;

    try {
      do {
        let params: any = {
          ...paramsFrom,
          ExclusiveStartKey: lastEvaluatedKey,
        };
        const result: any = await this.dynamo.scan(params).promise();

        lastEvaluatedKey = result["LastEvaluatedKey"];
        resultItems = resultItems.concat(result["Items"]);
      } while (lastEvaluatedKey);

      console.log("resultSet_Dynamo", resultItems[0]);
      const items = resultItems || [];

      if (items.length > 0) {
        const dynamo_user = items[0];

        const user = new User(
          dynamo_user.name,
          dynamo_user.email,
          dynamo_user.phone,
          dynamo_user.document
        );

        user.setId(dynamo_user.id);
        user.setCreatedAt(dynamo_user.createdAt);

        return user;
      }

      return null;
    } catch (err) {
      console.log("err:", err);
      throw new Error(String(err));
    }
  }
}
