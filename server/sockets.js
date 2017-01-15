const socketio = require('socket.io');
const amqp = require('amqplib/callback_api');
const async = require('async');

let q='tasks';

/**
 * RabbitMQ Consumer
 * @param {comm} conn
 * @param {callback} cb
 */
function consumer(conn, cb) {
  conn.createChannel(function(err, consumerChannel) {
    if (err != null) {
		console.error(err);
		cb(err);
    }
    consumerChannel.assertQueue(q);
    cb(null, consumerChannel);
  });
}

/**
 * RabbitMQ publisher
 * @param {comm} conn
 * @param {callback} cb
 */
function publisher(conn, cb) {
  conn.createChannel(function(err, publisherChannel) {
    if (err != null) {
		console.error(err);
		cb(err);
	}
    publisherChannel.assertQueue(q);
    cb(null, publisherChannel);
    // ch.sendToQueue(q, new Buffer('something to do'));
  });
}

exports.listen = function(app) {
	async.parallel({
		channel: function(cb) {
			amqp.connect('amqp://localhost', function(err, conn) {
				if (err != null) {
					console.log(err);
					cb(err);
				}
				consumer(conn, function(err, consumerChannel) {
					if (err != null) {
						console.log(err);
						cb(err);
					}
					publisher(conn, function(err, publisherChannel) {
						if (err != null) {
							console.log(err);
							cb(err);
						}
						cb(null, {
							'consumerChannel': consumerChannel,
							'publisherChannel': publisherChannel,
						});
					});
				});
			});
		},
		io: function(cb) {
			io = socketio.listen(app);
			cb(null, io);
		}},
		function(err, obj) {
			console.log(err);

			let ch = obj['channel'];
			let consumerChannel = ch['consumerChannel'];
			consumerChannel.consume(q, function(msg) {
				if (msg !== null) {
					console.log(msg.content.toString());
					io.emit('message',
						{type: 'new-message', text: msg.content.toString()});
					consumerChannel.ack(msg);
				}
			});

			let publisherChannel = ch['publisherChannel'];
			let io = obj['io'];
			io.on('connection', (socket) => {
				console.log('user connected');
				socket.on('disconnect', function() {
					console.log('user disconnected');
				});

				socket.on('add-message', (message) => {
					publisherChannel.sendToQueue(q, new Buffer(message));
					// io.emit('message', {type: 'new-message', text: message});
				});
			});
		}
	);
};
