import React, { useState } from 'react';
import wiki from 'wikijs';
import { Button, Textarea } from '@contentful/forma-36-react-components';

export default function WikiText({ sdk }) {
  const [value, setValue] = useState(sdk.field.getValue());
  const [name, setName] = useState(sdk.entry.fields.name.getValue());
  const saveValue = (text) => {
    sdk.field.setValue(text).then((t) => setValue(t));
  };

  const textMaxLength = 1000;

  sdk.window.startAutoResizer();
  const onNameChanged = (text) => {
    if (text !== name) setName(text);
  };

  sdk.entry.fields.name.onValueChanged(onNameChanged);

  const getWiki = (lang) => {
    return wiki({ apiUrl: `https://${lang}.wikipedia.org/w/api.php` })
      .page(name)
      .then((res) => res.summary())
      .then((summary) => {
        if (summary.length < textMaxLength) {
          return wiki({ apiUrl: `https://${lang}.wikipedia.org/w/api.php` })
            .page(name)
            .then((res) => res.content())
            .then((content) => {
              let result = summary;
              for (let i = 0; i < content.length - 1 && result.length < textMaxLength; i++) {
                result += `\n\n${content[i].title}\n${content[i].content}`;
              }
              return result;
            });
        }
        return summary;
      })
      .catch((err) => console.log(err));
  };

  wiki().page('batman');

  const onClick = () => {
    Promise.all([
      getWiki('pl').catch((err) => console.log(err)),
      getWiki('en').catch((err) => console.log(err)),
    ]).then(([pl, en]) => {
      if (!pl && !en) {
        setValue('No page found on the wiki');
      } else {
        saveValue(pl || en);
      }
    });
  };

  const onTextChanged = (text) => {
    if (text !== value) {
      saveValue(text);
    }
  };

  return (
    <>
      <Textarea rows={15} value={value} onChange={(e) => onTextChanged(e.target.value)} />
      <Button onClick={() => onClick()}>Get from wiki</Button>
    </>
  );
}
