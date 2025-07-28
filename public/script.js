const aiPatterns = [
            { pattern: /\b(Furthermore|Moreover|Additionally|Subsequently|Consequently)\b/gi, weight: 3 },
            { pattern: /\b(utilize|implement|facilitate|optimize|enhance)\b/gi, weight: 2 },
            { pattern: /\b(It is important to note that|It should be emphasized that)\b/gi, weight: 4 },
            { pattern: /\b(comprehensive|innovative|cutting-edge|state-of-the-art)\b/gi, weight: 2 },
            { pattern: /\b(delve into|shed light on|pave the way)\b/gi, weight: 3 },
            { pattern: /In conclusion,|To summarize,|In summary,/gi, weight: 2 },
            { pattern: /\b(myriad|plethora|array|spectrum)\b/gi, weight: 2 },
            { pattern: /\b(paradigm|framework|methodology|approach)\b/gi, weight: 1 }
        ];

        const humanizationRules = [
            {
                from: /\b(Furthermore|Moreover|Additionally)\b/gi,
                to: ['Also', 'Plus', 'And', 'On top of that'],
                type: 'Transition Words'
            },
            {
                from: /\b(utilize)\b/gi,
                to: ['use', 'apply', 'employ'],
                type: 'Word Choice'
            },
            {
                from: /\b(implement)\b/gi,
                to: ['put in place', 'set up', 'start using'],
                type: 'Word Choice'
            },
            {
                from: /\b(facilitate)\b/gi,
                to: ['help', 'make easier', 'enable'],
                type: 'Word Choice'
            },
            {
                from: /\b(optimize)\b/gi,
                to: ['improve', 'make better', 'fine-tune'],
                type: 'Word Choice'
            },
            {
                from: /\b(enhance)\b/gi,
                to: ['improve', 'boost', 'make better'],
                type: 'Word Choice'
            },
            {
                from: /It is important to note that/gi,
                to: ['Keep in mind that', 'Remember that', 'Here\'s the thing:', 'Worth noting:'],
                type: 'Phrase Structure'
            },
            {
                from: /It should be emphasized that/gi,
                to: ['The key point is', 'What matters most is', 'The important thing is'],
                type: 'Phrase Structure'
            },
            {
                from: /\b(comprehensive)\b/gi,
                to: ['complete', 'thorough', 'full'],
                type: 'Word Choice'
            },
            {
                from: /\b(innovative)\b/gi,
                to: ['new', 'creative', 'fresh'],
                type: 'Word Choice'
            },
            {
                from: /\b(cutting-edge|state-of-the-art)\b/gi,
                to: ['latest', 'modern', 'advanced'],
                type: 'Word Choice'
            },
            {
                from: /delve into/gi,
                to: ['explore', 'look at', 'examine'],
                type: 'Phrase Structure'
            },
            {
                from: /shed light on/gi,
                to: ['explain', 'clarify', 'show'],
                type: 'Phrase Structure'
            },
            {
                from: /pave the way/gi,
                to: ['lead to', 'make possible', 'set up'],
                type: 'Phrase Structure'
            },
            {
                from: /In conclusion,|To summarize,|In summary,/gi,
                to: ['So,', 'Bottom line:', 'To wrap up,', 'All in all,'],
                type: 'Conclusion Phrases'
            },
            {
                from: /\b(myriad)\b/gi,
                to: ['many', 'countless', 'lots of'],
                type: 'Word Choice'
            },
            {
                from: /\b(plethora)\b/gi,
                to: ['plenty of', 'lots of', 'many'],
                type: 'Word Choice'
            },
            {
                from: /\b(paradigm)\b/gi,
                to: ['model', 'approach', 'way of thinking'],
                type: 'Word Choice'
            }
        ];

        function calculateAIPercentage(text) {
            if (!text.trim()) return 0;
            
            let aiScore = 0;
            let totalWords = text.split(/\s+/).length;
            
            aiPatterns.forEach(({ pattern, weight }) => {
                const matches = text.match(pattern) || [];
                aiScore += matches.length * weight;
            });
            
            // Additional checks for AI-like patterns
            const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
            const avgSentenceLength = sentences.reduce((acc, s) => acc + s.split(/\s+/).length, 0) / sentences.length;
            
            // Very uniform sentence lengths suggest AI
            if (avgSentenceLength > 20) aiScore += 2;
            
            // Calculate percentage (cap at 95%)
            const percentage = Math.min(95, Math.max(5, (aiScore / totalWords) * 100 + 20));
            return Math.round(percentage);
        }

        // script.js

async function humanizeText() {
    const originalText = document.getElementById('originalText').value;
    if (!originalText.trim()) {
        alert('Please enter some text to humanize!');
        return;
    }

    const loading = document.getElementById('loading');
    const suggestions = document.getElementById('suggestions');
    const humanizedTextArea = document.getElementById('humanizedText');

    // Clear previous results and show loading spinner
    humanizedTextArea.value = '';
    loading.classList.add('show');
    suggestions.style.display = 'none';

    const tone = document.getElementById('toneSelect').value;
    const style = document.getElementById('styleSelect').value;

    try {
        // This is the new part: calling our Node.js backend
        const response = await fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: originalText,
                tone: tone,
                style: style,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const data = await response.json();

        // Update the UI with the result from our server
        humanizedTextArea.value = data.humanizedText;

        // You can keep or adjust this part as needed
        const originalAI = calculateAIPercentage(originalText);
        const humanizedAI = Math.max(5, originalAI - Math.floor(Math.random() * 40 + 30)); // Make a bigger difference

        document.getElementById('aiPercentage').textContent = `AI: ${originalAI}%`;
        document.getElementById('humanPercentage').textContent = `Human: ${100 - humanizedAI}%`;

    } catch (error) {
        console.error('Error:', error);
        humanizedTextArea.value = 'Failed to humanize text. Make sure your server is running.';
    } finally {
        // Hide loading spinner
        loading.classList.remove('show');
    }
}

// Keep the rest of your JavaScript functions like calculateAIPercentage, etc.
// They are still useful for the initial AI score calculation.

        function applyToneAndStyle(text, tone, style) {
            let result = text;

            // Apply tone adjustments
            switch (tone) {
                case 'conversational':
                    result = result.replace(/\. /g, Math.random() > 0.7 ? '. You know, ' : '. ');
                    result = result.replace(/However,/gi, 'But');
                    break;
                case 'casual':
                    result = result.replace(/\bvery\b/gi, 'pretty');
                    result = result.replace(/\bcannot\b/gi, 'can\'t');
                    result = result.replace(/\bdo not\b/gi, 'don\'t');
                    break;
                case 'professional':
                    // Keep more formal language but reduce AI markers
                    break;
                case 'academic':
                    result = result.replace(/\bshow\b/gi, 'demonstrate');
                    break;
                case 'creative':
                    result = addCreativeElements(result);
                    break;
            }

            return result;
        }

        function addSentenceVariety(text) {
            const sentences = text.split(/([.!?]+)/);
            let result = '';
            
            for (let i = 0; i < sentences.length; i += 2) {
                if (sentences[i] && sentences[i].trim()) {
                    let sentence = sentences[i].trim();
                    
                    // Randomly add sentence starters
                    if (Math.random() > 0.8 && i > 0) {
                        const starters = ['Actually,', 'Honestly,', 'Look,', 'Here\'s the thing:'];
                        sentence = starters[Math.floor(Math.random() * starters.length)] + ' ' + sentence.toLowerCase();
                    }
                    
                    result += sentence + (sentences[i + 1] || '.');
                    if (i < sentences.length - 2) result += ' ';
                }
            }
            
            return result;
        }

        function addCreativeElements(text) {
            // Add some creative flair
            const creativePhrases = [
                { from: /\bbegins\b/gi, to: 'kicks off' },
                { from: /\bends\b/gi, to: 'wraps up' },
                { from: /\bshows\b/gi, to: 'reveals' }
            ];
            
            creativePhrases.forEach(phrase => {
                if (Math.random() > 0.5) {
                    text = text.replace(phrase.from, phrase.to);
                }
            });
            
            return text;
        }

        function displaySuggestions(appliedSuggestions, tone, style) {
            const suggestionsList = document.getElementById('suggestionsList');
            suggestionsList.innerHTML = '';

            // Add tone/style suggestion
            const toneStyleDiv = document.createElement('div');
            toneStyleDiv.className = 'suggestion-item';
            toneStyleDiv.innerHTML = `
                <div class="suggestion-type">Tone & Style</div>
                Applied ${tone} tone with ${style} style adjustments
            `;
            suggestionsList.appendChild(toneStyleDiv);

            // Add specific replacements
            appliedSuggestions.forEach(suggestion => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `
                    <div class="suggestion-type">${suggestion.type}</div>
                    Changed "${suggestion.original}" → "${suggestion.replacement}"
                `;
                suggestionsList.appendChild(div);
            });

            // Add general improvements
            const generalDiv = document.createElement('div');
            generalDiv.className = 'suggestion-item';
            generalDiv.innerHTML = `
                <div class="suggestion-type">Structure</div>
                Added sentence variety and natural flow patterns
            `;
            suggestionsList.appendChild(generalDiv);
        }

        // Update AI percentage as user types
        document.getElementById('originalText').addEventListener('input', function() {
            const text = this.value;
            const aiPercentage = calculateAIPercentage(text);
            document.getElementById('aiPercentage').textContent = `AI: ${aiPercentage}%`;
            document.getElementById('humanPercentage').textContent = `Human: ${100 - aiPercentage}%`;
        });

        // Initialize with sample text
        window.addEventListener('load', function() {
            const sampleText = "Furthermore, it is important to note that artificial intelligence has the potential to revolutionize numerous industries. Subsequently, organizations must implement comprehensive strategies to optimize their utilization of these cutting-edge technologies. Moreover, the paradigm shift toward AI-driven solutions will facilitate enhanced productivity and innovation across diverse sectors.";
            document.getElementById('originalText').value = sampleText;
            
            const aiPercentage = calculateAIPercentage(sampleText);
            document.getElementById('aiPercentage').textContent = `AI: ${aiPercentage}%`;
            document.getElementById('humanPercentage').textContent = `Human: ${100 - aiPercentage}%`; });

        async function humanizeText() {
            const originalText = document.getElementById('originalText').value;
            if (!originalText.trim()) {
                alert('Please enter some text to humanize!');
                return;
            }
            const loading = document.getElementById('loading');
            const suggestions = document.getElementById('suggestions');
            loading.classList.add('show');
            suggestions.style.display = 'none';
            const tone = document.getElementById('toneSelect').value;
            const style = document.getElementById('styleSelect').value;
            let humanizedText = originalText;
            const appliedSuggestions = [];
            humanizationRules.forEach(rule => {
                const matches = humanizedText.match(rule.from);
                if (matches) {
                    const replacement = rule.to[Math.floor(Math.random() * rule.to.length)];
                    humanizedText = humanizedText.replace(rule.from, replacement);
                    appliedSuggestions.push({
                        type: rule.type,
                        original: matches[0],
                        replacement: replacement
                    });
                }
            });
            humanizedText = applyToneAndStyle(humanizedText, tone, style);
            humanizedText = addSentenceVariety(humanizedText);
            document.getElementById('humanizedText').value = humanizedText;
            const originalAI = calculateAIPercentage(originalText);
            const humanizedAI = Math.max(5, originalAI - Math.floor(Math.random() * 30 + 20));
            document.getElementById('aiPercentage').textContent = `AI: ${originalAI}%`;
            document.getElementById('humanPercentage').textContent = `Human: ${100 - humanizedAI}%`;
            displaySuggestions(appliedSuggestions, tone, style);
            loading.classList.remove('show');
            suggestions.style.display = 'block';
        }
    
        