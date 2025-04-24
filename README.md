View and manipulate the data in a Solid Pod.

Try it out yourself at https://Penny.VincentTunru.com.

## Using as a Solid server UI

It is also possible to use Penny as the UI for a Solid server.
When running as a server UI, Penny will attempt to render the data available
at the URL it is running on. Thus, the server will need to be configured to
serve up Penny when a web browser is accessing the data, and raw data when that
is requested explicitly.

The server UI is available in the npm package
[`penny-pod-inspector`](https://www.npmjs.com/package/penny-pod-inspector),
in a folder called `server-ui/`.

For an example of how to set this up for the [Solid Community
Server](https://github.com/solid/community-server/), see [this
recipe](https://github.com/solid/community-server-recipes/tree/main/penny).

Note that server UI use is currently experimental.

## Deploying elsewhere

Although the app is deployed at https://Penny.VincentTunru.com, you can also
deploy it elsewhere if you wish.

To do so, you can serve up the contents of the `standalone/` folder in the npm
package
[`penny-pod-inspector`](https://www.npmjs.com/package/penny-pod-inspector).

## Development

To run Penny locally, you'll need [Node.js](https://nodejs.org). After
installing the required dependencies using `npm install` in the folder that
contains the Penny source code, you can start it by running:

    npm run dev

This will start a local server at `http://localhost:3000`, running your local
copy of the code.
