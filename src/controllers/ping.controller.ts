import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {get, post, Request, ResponseObject, RestBindings} from '@loopback/rest';
import {MyModelRepository} from '../repositories';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PingResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @repository('MyModelRepository')
    private repo: MyModelRepository,
  ) {}

  // Map to `GET /ping`
  @get('/ping', {
    responses: {
      '200': PING_RESPONSE,
    },
  })
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
  @post('run-test')
  async runtest(): Promise<object> {
    //create table
    await this.repo.execute('CREATE TABLE mymodel (col1 TEXT)', []);

    //populate data
    await this.repo.execute(
      `insert into mymodel(col1) values ('a'),('b'),('c');`,
      [],
    );

    const all = await this.repo.find();
    const first = all[0];
    first.col1 =
      'meant to change one row, but passed in undefined to updateById as id, and now all rows are updated.';
    await this.repo.updateById(undefined, first);
    const newRows = await this.repo.find();
    console.log(newRows);
    return newRows;
  }
}
