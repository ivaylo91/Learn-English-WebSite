import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'Учи Английски',
    short_name:       'Учи',
    description:      'Безплатна платформа за английски — речник, граматика, слушане, четене и писане.',
    start_url:        '/',
    display:          'standalone',
    background_color: '#fffbf8',
    theme_color:      '#e8633a',
    orientation:      'portrait-primary',
    categories:       ['education', 'productivity'],
    lang:             'bg',
    icons: [
      {
        src:   '/icons/192',
        sizes: '192x192',
        type:  'image/png',
      },
      {
        src:   '/icons/512',
        sizes: '512x512',
        type:  'image/png',
      },
      {
        src:     '/icons/maskable/512',
        sizes:   '512x512',
        type:    'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name:      'Речник',
        short_name: 'Речник',
        url:       '/rechnik',
        description: 'Флаш карти и речник',
      },
      {
        name:      'Учене',
        short_name: 'Учене',
        url:       '/rechnik/study',
        description: 'Сесия за повторение',
      },
    ],
  };
}
