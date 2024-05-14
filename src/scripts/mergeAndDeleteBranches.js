const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: "" });

async function mergeAndDeleteBranches(owner, repo, tag1, tag2) {
    try {
        let prs = [];
        let page = 1;
        let response;

        do {
            response = await octokit.pulls.list({
                owner,
                repo,
                state: 'open',
                per_page: 100,
                page
            });

            prs = prs.concat(response.data);
            page++;
        } while (response.data.length === 100);

        const filteredPRs = prs.filter(pr =>
            // pr.labels.some(label => label.name == tag1) &&
            pr.labels.some(label => label.name == "Assignment-4" || label.name == "Assignment-6" || label.name == "Assignment-7" || label.name == "Assignment-9")
        );

        console.log(`Found ${filteredPRs.length} PRs to merge and delete.`);

        let counter = 1;
        for (const pr of filteredPRs) {
            await octokit.pulls.merge({
                owner,
                repo,
                pull_number: pr.number
            });
        
            console.log(`${counter}. PR ${pr.number} merged successfully.`);
        
            await octokit.git.deleteRef({
                owner,
                repo,
                ref: `heads/${pr.head.ref}`
            });
        
            console.log(`${counter}. Branch ${pr.head.ref} deleted.`);
            
            counter++;
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const owner = 'goodKodersUnV';
const repo = 'LMS-DATA';
const tag1 = 'mentor-22071A05E3';
const tag2 = 'Assignment-3';

mergeAndDeleteBranches(owner, repo, tag1, tag2);



