import chart_accounts from './report_chart_accounts.json'
import journal from './report_journal.json'
import general_ledger from './report_general_ledger.json'
import trial_balance from './report_trial_balance.json'

export default function get(report_name) {

    switch (report_name) {
        case 'report/chart_accounts':
            return chart_accounts;
        case 'report/journal':
            return journal
        case 'report/general_ledger':
            return general_ledger
        case 'report/trial_balance':
            return trial_balance
        default:
            throw new Error('Eror fetching format: invalid report name')
    }
}
