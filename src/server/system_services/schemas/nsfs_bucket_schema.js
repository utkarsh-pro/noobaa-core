/* Copyright (C) 2016 NooBaa */
'use strict';

module.exports = {
    $id: 'bucket_schema',
    type: 'object',
    required: [
        '_id',
        'name',
        'owner_account',
        'versioning',
        'path',
        'should_create_underlying_storage',
        'creation_date',
    ],
    properties: {
        _id: {
            type: 'string',
        },
        // owner_account is the account _id
        owner_account: {
            type: 'string',
        },
        // creator is the account id that created this bucket (internal information)
        creator: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        /**
         * @deprecated system_owner is kept for backward compatibility,
         * but will no longer be included in new / updated bucket json.
         */
        system_owner: {
            type: 'string',
        },
        /** 
         * @deprecated bucket_owner is kept for backward compatibility,
         * but will no longer be included in new / updated bucket json.
         */
        bucket_owner: {
            type: 'string',
        },
        tag: {
            $ref: 'common_api#/definitions/tagging',
        },
        versioning: {
            $ref: 'common_api#/definitions/versioning',
        },
        path: {
            type: 'string',
        },
        should_create_underlying_storage: {
            type: 'boolean',
        },
        creation_date: {
            type: 'string',
        },
        fs_backend: {
            $ref: 'common_api#/definitions/fs_backend'
        },
        s3_policy: {
            $ref: 'common_api#/definitions/bucket_policy',
        },
        encryption: {
            $ref: 'common_api#/definitions/bucket_encryption',
        },
        website: {
            $ref: 'common_api#/definitions/bucket_website',
        },
        force_md5_etag: {
            type: 'boolean',
        },
        logging: {
            $ref: 'common_api#/definitions/bucket_logging',
        },
        lifecycle_configuration_rules: {
            $ref: 'common_api#/definitions/bucket_lifecycle_configuration',
        },
        notifications: {
            type: 'array',
            items: {
                $ref: 'common_api#/definitions/bucket_notification'
            }
        },
        cors_configuration_rules: {
            $ref: 'common_api#/definitions/bucket_cors_configuration'
        },
        public_access_block: {
            $ref: 'common_api#/definitions/public_access_block',
        }
    }
};
