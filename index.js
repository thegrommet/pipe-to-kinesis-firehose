#!/usr/bin/env node

process.env.AWS_SDK_LOAD_CONFIG=1
const _ = require('highland')
const firehose = require('highland-kinesis-firehose')
const split = require('split2')
const AWS = require('aws-sdk')
const args = require('yargs')
	.option('stream', {
		alias: 's',
		description: 'The stream to put records to',
		required: true
	})
	.help('help')
	.argv

_(process.stdin.pipe(split()))
	.pipe(firehose(new AWS.Firehose(), args.stream))
	.errors(err => console.error(err.ErrorCode, err.ErrorMessage))
	.done(() => console.log("Stream ended"))
