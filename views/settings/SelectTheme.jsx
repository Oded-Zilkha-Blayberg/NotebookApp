import React from "react";
import { View } from "react-native";
import { Layout, RadioGroup, Radio, Icon, List, ListItem, Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import GlobalStyle from "../../theme/GlobalStyle";
import { ThemeContext, Theme } from "../../theme/themeContext";

export default class SelectTheme extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        };
    }

    static contextType = ThemeContext;

    render() {
        return (
            <Layout style={GlobalStyle.container} level="4">
                {/* <View style={GlobalStyle.header}>
                    <ListItem
                    accessoryLeft={(props) => <Icon {...props} name="arrow-forward" />}
                    />
                </View> */}
                <View style={GlobalStyle.body}>
                    <View style={[GlobalStyle.bodyItem, {width: "100%"}]}>
                        {/* <TopNavigation
                        title={() =>
                            <Text
                            category="h6"
                            >בחירת ערכת נושא</Text>
                        }
                        accessoryLeft={(props) => 
                            <TopNavigationAction
                            icon={(props) => <Icon {...props} name="arrow-forward" />}
                            />
                        }
                        /> */}
                        <Text
						category="h6"
						appearance="hint"
						style={GlobalStyle.subtitle}
						>בחירת ערכת נושא</Text>
                        {/* <List
                        data={Object.values(Theme)}
                        ItemSeparatorComponent={Divider}
                        renderItem={(item, index) => (
                            <ListItem
                            title={item.item.name}
                            >
                                <Radio checked={item.item.value === this.context.theme.value} >
                                {evaProps => <Text {...evaProps}>{item.item.name}</Text>}
                                </Radio>
                            </ListItem>
                        )}
                        /> */}

                        {Object.values(Theme).map((item, index) => (
                            <Radio
                            checked={item.value === this.context.theme.value}
                            style={GlobalStyle.radioItem}
                            onChange={() => this.context.changeTheme(item)}
                            >
                            {evaProps => <Text {...evaProps}>{item.name}</Text>}
                            </Radio>
                        ))}
                    </View>
                </View>
            </Layout>
        );
    }
}