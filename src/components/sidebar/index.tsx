import Header from '@/components/header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DEFAULT_VALUES } from '@/constants/default-values'
import Codesnippet from './codesnippet'
import ContentCustomize from './content-customize'
import ContentDefault from './content-default'
import CustomizeDialog from './adjust-dialog'
import { valuesAtom } from '@/states/values'
import { useAtom, useAtomValue } from 'jotai'
import { textShadowAtom } from '@/states/text-shadow'

export default function Sidebar() {
  const [values, setValues] = useAtom(valuesAtom)
  const textShadow = useAtomValue(textShadowAtom)

  const code = `color: ${values.textColor};
font-weight: ${values.fontWeight};
text-shadow: ${textShadow.replace(values.strokeColor, 'var(--color)')};
--color: ${values.strokeColor};`

  const handleChangeTabs = (value: string) => {
    if (value === 'default') {
      setValues(DEFAULT_VALUES)
    }
  }

  return (
    <div className="grid h-full place-content-start gap-10 overflow-y-auto bg-sidebar px-4 pt-8 text-sidebar-foreground md:min-h-screen">
      <Header />

      <div className="relative">
        <Tabs defaultValue="default" onValueChange={handleChangeTabs}>
          <TabsList>
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            <ContentDefault />
          </TabsContent>
          <TabsContent value="customize">
            <ContentCustomize />
          </TabsContent>
        </Tabs>

        <div className="pointer-events-none sticky bottom-0 left-0">
          <div className="h-10 bg-gradient-to-b from-transparent to-sidebar" />
          <div className="pointer-events-auto grid gap-2 bg-sidebar pb-8">
            <div className="flex items-center justify-between">
              <p>コード</p>
              <div className="flex-shrink-0">
                <CustomizeDialog />
              </div>
            </div>
            <Codesnippet code={code} />
            <p className="text-right">
              {new Blob([code]).size.toLocaleString()} bytes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
