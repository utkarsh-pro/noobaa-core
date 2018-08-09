import template from './pre-upgrade-system-failed-modal.html';
import Observer from 'observer';
import IssueRowViewModel from './issue-row';
import ko from 'knockout';
import { state$, action$ } from 'state';
import { closeModal } from 'action-creators';
import { deepFreeze } from 'utils/core-utils';
import { formatEmailUri } from 'utils/browser-utils';
import { get } from 'rx-extensions';
import { support } from 'config';

const columns = deepFreeze([
    {
        name: 'icon',
        label: '',
        type: 'icon'
    },
    {
        name: 'server',
        label: 'Server Name'
    },
    {
        name: 'details',
        type: 'issueDetails'
    }
]);

class PreUpgradeSystemFailedModalViewModel extends Observer {
    constructor() {
        super();

        this.columns = columns;
        this.supportEmail = formatEmailUri(support.email, support.upgradeFailedSubject);
        this.rows = ko.observableArray();

        this.observe(
            state$.pipe(get('topology', 'servers')),
            this.onState
        );
    }

    onState(servers) {
        if (!servers) return;

        const serverList = Object.values(servers);
        const rows = serverList
            .reduce((issues, server) => {
                const { error } = (((server || {}).upgrade || {}).package || {});

                if (error) {
                    issues.push({
                        server: server.secret,
                        ...error
                    });
                }
                return issues;
            },[])
            .map((issue, i) => {
                const row = this.rows.get(i) || new IssueRowViewModel();
                row.onState(issue, servers[issue.server]);
                return row;
            });

        this.rows(rows);
    }

    onClose() {
        action$.next(closeModal());
    }
}

export default {
    viewModel: PreUpgradeSystemFailedModalViewModel,
    template: template
};
